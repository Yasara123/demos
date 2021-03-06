function updateCloudText(new_text, stopWords, cloudDiv, color) {
    var cloudDivID = cloudDiv;
    var width = $(cloudDivID).width();
    var height = $(cloudDivID).height();
    var colorset = [color, "#A19A9A", "#000000"];
    var speck = {
        "width": width,
        "height": height,
        "padding": {
            "top": 0,
            "bottom": 0,
            "left": 0,
            "right": 0
        },

        "data": [{
            "name": "table",
            "values": [new_text],

            "transform": [{
                "type": "countpattern",
                "field": "data",
                "case": "upper",
                "pattern": "[\\w']{3,}",
                "stopwords": stopWords
            }, {
                "type": "formula",
                "field": "angle",
                "expr": "[-45, 0, 45][~~(random() * 3)]"
            }, {
                "type": "formula",
                "field": "weight",
                "expr": "if(datum.text=='VEGA', 600, 300)"
            }, {
                "type": "wordcloud",
                "size": [width, height],
                "text": {
                    "field": "text"
                },
                "rotate": {
                    "field": "angle"
                },
                "font": {
                    "value": "Verdana"
                },
                "fontSize": {
                    "field": "count"
                },
                "fontWeight": {
                    "field": "weight"
                },
                "fontScale": [20, 60]
            }]
        }],

        "scales": [{
            "name": "color",
            "type": "ordinal",
            "range": colorset
        }],

        "marks": [{
            "type": "text",
            "from": {
                "data": "table"
            },
            "properties": {
                "enter": {
                    "x": {
                        "field": "layout_x"
                    },
                    "y": {
                        "field": "layout_y"
                    },
                    "angle": {
                        "field": "layout_rotate"
                    },
                    "font": {
                        "field": "layout_font"
                    },
                    "fontSize": {
                        "field": "layout_fontSize"
                    },
                    "fontStyle": {
                        "field": "layout_fontStyle"
                    },
                    "fontWeight": {
                        "field": "layout_fontWeight"
                    },
                    "text": {
                        "field": "text"
                    },
                    "align": {
                        "value": "center"
                    },
                    "baseline": {
                        "value": "alphabetic"
                    },
                    "fill": {
                        "scale": "color",
                        "field": "text"
                    }
                },
                "update": {
                    "fillOpacity": {
                        "value": 1
                    }
                },
                "hover": {
                    "fillOpacity": {
                        "value": 0.5
                    }
                }
            }
        }]

    };
    var viewUpdateFunction = (function(chart) {
        this.view = chart({
            el: cloudDivID
        }).update();
    }).bind(this);

    vg.parse.spec(speck, viewUpdateFunction);

};

function getCandidateCloud() {
    var color = ["#fa574b", "#3ec2ee", "#1c40fb", "#e51000"];
    var partyName = ["TRUMP", "CLINTON", "BERNIE", "CRUZ"];
    var cloudDiv = ["WCR1", "WCD1", "WCD2", "WCR2"];
    var stopWords = "(|)";

    $.ajax({
        url: "api/candidateCloud.jag",
        dataType: "json",
        type: "GET",
        success: function(data) {
            for (var j = 0; j < 4; j++) {
                var textData = JSON.stringify(data[j]);
                var res = textData.split(";");
                var longstr = "";
                for (var i = 1; i < res.length - 1; i++) {
                    var row = res[i].split(",");
                    var word = row[0].split(":");
                    var count = row[1].split(":");
                    if (!(word[1] == '')) {
                        for (var k = 0; k < count[1]; k++) {
                            longstr += word[1] + " ";
                        }
                    }
                }
                var cloudDivID = "#" + cloudDiv[j];

                updateCloudText(longstr, stopWords, cloudDivID, color[j]);

            }

        },
        error: function(request, error) {
            $("#errorInWorCloud").html('<strong>Error!</strong> Error in  getCandidateCloud: ' + error);
        }

    });



};
