<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@page import="util.Tools"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.List"%>
<%@page import="org.hibernate.criterion.Restrictions"%>
<%@page import="entities.Todo"%>
<%@page import="org.hibernate.Criteria"%>
<%@page import="org.hibernate.Session"%>
<%@page import="entities.Users"%>
<%@page import="org.hibernate.cfg.Configuration"%>
<%@page import="org.hibernate.SessionFactory"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="assets/images/favicon.ico">

        <title>TO DO LIST</title>

		<link href="assets/plugins/bootstrap-sweetalert/sweet-alert.css" rel="stylesheet" type="text/css" />
		<link href="assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/plugins/jquery-datatables-editable/datatables.css" />
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/menu.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
		

     <style>
			.errorType{
				border-color: #F00 !important;
			}
			.selected{
				background-color: #d1ebf7!important;
			}
			
			.trhover:hover{
				cursor: pointer;
			}
			
		</style>

        <script src="assets/js/modernizr.min.js"></script>			

    </head>
    <body>
        <!-- Navigation Bar-->
        <header id="topnav">
            <div class="topbar-main">
                <div class="container">

                    <!-- LOGO -->
                    <div class="topbar-left">
                        <a href="index.html" class="logo"><span>TODO<span>LIST</span>
                        </span></a>
                    </div>
 					<div class="menu-extras">

                        <ul class="nav navbar-nav navbar-right pull-right">
                            <li class="dropdown user-box">
                                <a href="" class="dropdown-toggle waves-effect waves-light profile " data-toggle="dropdown" aria-expanded="true">
                                    <img src="assets/images/users/avatar-1.jpg" alt="user-img" class="img-circle user-img">
                                    <div class="user-status away"><i class="zmdi zmdi-dot-circle"></i></div>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a id="logout"><i class="ti-power-off m-r-5"></i>Logout</a></li>
                                </ul>
                            </li>
		                        <a class="logo">
		                        <% 
		                    		HttpSession httpSession = request.getSession();
		                         	String username = (String)httpSession.getAttribute("sessionUsername");
		                         	if(username == null){
		                         		String redirectURL = "login.jsp";
		                    	 	    response.sendRedirect(redirectURL);
		                         	}
		                         	out.print(username);
		                        
		                        %></a>
                        </ul>
                        <div class="menu-item">
                            <!-- Mobile menu toggle-->
                            <a class="navbar-toggle">
                                <div class="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                            <!-- End mobile menu toggle-->
                        </div>
                    </div>

                </div>
            </div>
        </header>
        <!-- End Navigation Bar-->
    
