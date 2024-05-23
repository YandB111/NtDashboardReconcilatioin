<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<%@page import="java.util.*" %>

<%

	String localeValue_helpconfig = (String) session.getAttribute(com.connectiva.commons.signon.shared.CommonsSignOnConstants.HTTP_SESSION_LOCALE);

	if(localeValue_helpconfig != null && localeValue_helpconfig.equalsIgnoreCase("fr_CA")) {
%>
		<jsp:include page="helpconfigkpi_fr_CA.jsp"/>
<%
	}
	else if(localeValue_helpconfig != null && localeValue_helpconfig.equalsIgnoreCase("ar_SA")) {
%>
		<jsp:include page="helpconfigkpi_ar_SA.jsp"/>
<%
	}
	else {
%>
		<jsp:include page="helpconfigkpi.jsp"/>
<%
	}
%>

	
	

