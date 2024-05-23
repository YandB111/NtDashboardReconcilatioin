<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<%@page import="java.util.*" %>

<%

	String localeValue_helpviewkpi = (String) session.getAttribute(com.connectiva.commons.signon.shared.CommonsSignOnConstants.HTTP_SESSION_LOCALE);

	if(localeValue_helpviewkpi != null && localeValue_helpviewkpi.equalsIgnoreCase("fr_CA")) {
%>
		<jsp:include page="helpviewkpi_fr_CA.jsp"/>
<%
	}
	else if(localeValue_helpviewkpi != null && localeValue_helpviewkpi.equalsIgnoreCase("ar_SA")) {
%>
		<jsp:include page="helpviewkpi_ar_SA.jsp"/>
<%
	}
	else {
%>
		<jsp:include page="helpviewkpi.jsp"/>
<%
	}
%>


	
	

