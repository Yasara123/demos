<%@page import="org.wso2.carbon.context.CarbonContext"%>
<%@ page import="javax.cache.CacheManager"%>
<%@ page import="javax.cache.Caching"%>
<%@ page import="javax.cache.Cache"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String cacheKey = request.getParameter("cachekey");
	String action = request.getParameter("action");

	CacheManager cacheManager =   Caching.getCacheManagerFactory().getCacheManager("tsampleCacheManager");
    Cache<String,String> cache = cacheManager.getCache("sampleCache");	
	 
	if(action != null && action.equals("add")){
		String cacheValue = request.getParameter("cachevalue");
	
		if(cacheKey != null && cacheValue != null){
		    cache.put(cacheKey, cacheValue);
%>
<p>
	Added entry:<%=cacheKey%>
</p>
<%
	}
	}
%>




<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Set Tenant Values in Cache Values</title>
</head>
<body>
	<h3>Add to Cache</h3>
	<form action="cache.jsp" method="POST">
		<table>
			<tr>
				<td>Cache key</td>
				<td><input type="text" name="cachekey" /></td>
			</tr>
			<tr>
				<td>Cache value</td>
				<td><input type="text" name="cachevalue" /></td>
			</tr>

			<tr>
				<td>&nbsp;</td>
				<td><input type="hidden" name="action" value="add"><input
					type="submit" value="Add to Cache" /></td>
			</tr>
		</table>
	</form>

	<h3>Read from Cache</h3>

	<form action="cache.jsp" method="POST">
		<table border="0">
			<tr>
				<td>Key</td>
				<td><input type="text" name="cachekey" /></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="hidden" name="action" value="view"><input
					type="submit" value="View"></td>
			</tr>
		</table>
	</form>
	</p>
	<hr />
	<%
		if (action != null && action.equals("view")) {
			String content = cache.get(cacheKey);
			if(content != null){
	%>
		<p>
			Value of entry	<strong><%=cacheKey%></strong> : <%=content%>
		</p>
	<%
		}else{
	%>
		<p>
			Unable to find an entry by the given key :<strong><%=cacheKey%></strong>
			
		</p>
	<%
		}
		}			
	%>

	<br/><br/>
	 <h2>Available Actions</h2> 
	<ul>
		<li><a href="./context/cache.jsp">Set Tenant Specific Cache Values</a></li>
		<li><a href="./context/registry.jsp">Set Tenant Specific Registry Values</a></li>
		<li><a href="./test/view.jsp">View Current Tenant Identity and Context Values</a></li>
		<li><a href="./usermgt/usermgt.jsp">Manage Tenant's User Realm</a></li>
		<li><a href="./database/database.jsp">Managed Tenant Specific Database</a></li>
		<li><a href="./logout.jsp">Logout</a></li>
	</ul>

	</body>
	</html>
	