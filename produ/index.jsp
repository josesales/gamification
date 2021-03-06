<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>

<c:set var="authenticated" value="false" />
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="ThemeBucket">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<title>Estudy Game</title>
<link href="css/main-built.min.css" rel="stylesheet">
<!--[if lt IE 9]><script src="js/ie8/ie8-responsive-file-warning.js"></script><![endif]-->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<security:authorize access="isAuthenticated()">
	<c:set var="authenticated" value="true" />
	<c:set var="userName">
		<security:authentication property="principal.username" />
	</c:set>
</security:authorize>
<body class="no-skin">
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<br>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>

	<div id="navbar" class="navbar navbar-default navbar-fixed-top">
		<div class="navbar-container" id="navbar-container">
			<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
				<span class="sr-only">Toggle sidebar</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<div class="navbar-header pull-left">
				<a href="#" class="navbar-brand">
					<small>
						<i class="fa fa-desktop"></i>
						&nbsp;&nbsp;Estudy Game
					</small>
				</a>
			</div>
			<div class="navbar-buttons navbar-header pull-right" role="navigation">
				<ul class="nav ace-nav">
					<li class="light-blue">
						<a data-toggle="dropdown" href="#" class="dropdown-toggle">
							<img class="nav-user-photo" src="images/avatar2.png" alt="Jason's Photo" />
							<span class="user-info">
								<small>Bem vindo,</small>
								Usuario
							</span>
							<i class="ace-icon fa fa-caret-down"></i>
						</a>
						<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
							<li>
								<a href="j_spring_security_logout">
									<i class="ace-icon fa fa-power-off"></i>
									Sair
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="main-container" id="main-container">
	
		<security:authorize access="hasAnyRole('PROFESSOR')">	
			<div id="sidebar" class="sidebar responsive sidebar-fixed">
				<ul class="nav nav-list" id='nav-accordion'>
					<li>
						<a href="#">
							<i class="menu-icon fa fa-home"></i>
							<span class="menu-text"> Home </span>
						</a>
						<b class="arrow"></b>
					</li>
					<li class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-file-text-o"></i>
							<span class="menu-text"> Cadastros </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu">
						
	<!-- 				<li id="alunos" class=""> -->
	<!-- 					<a href="#app/alunos"> -->
	<!-- 						<i class="menu-icon fa fa-caret-right"></i> -->
	<!-- 						Aluno -->
	<!-- 					</a> -->
	<!-- 					<b class="arrow"></b> -->
	<!-- 				</li> -->
				
				<li id="disciplinas" class="">
					<a href="#app/disciplinas">
						<i class="menu-icon fa fa-caret-right"></i>
						Disciplina
					</a>
					<b class="arrow"></b>
				</li>
				
				<li id="listas" class="">
					<a href="#app/listas">
						<i class="menu-icon fa fa-caret-right"></i>
						Lista
					</a>
					<b class="arrow"></b>
				</li>
				
				<li id="professors" class="">
					<a href="#app/professors">
						<i class="menu-icon fa fa-caret-right"></i>
						Professor
					</a>
					<b class="arrow"></b>
				</li>
				
				<li id="questaos" class="">
					<a href="#app/questaos">
						<i class="menu-icon fa fa-caret-right"></i>
						Questão
					</a>
					<b class="arrow"></b>
				</li>
				
				<li id="questaoDesafios" class="">
					<a href="#app/questaoDesafios">
						<i class="menu-icon fa fa-caret-right"></i>
						Questão Desafio
					</a>
					<b class="arrow"></b>
				</li>
				
	<!-- 			<li id="rankings" class=""> -->
	<!-- 				<a href="#app/rankings"> -->
	<!-- 					<i class="menu-icon fa fa-caret-right"></i> -->
	<!-- 					Ranking -->
	<!-- 				</a> -->
	<!-- 				<b class="arrow"></b> -->
	<!-- 			</li> -->
	<!-- 				<li id="roles" class=""> -->
	<!-- 					<a href="#app/roles"> -->
	<!-- 						<i class="menu-icon fa fa-caret-right"></i> -->
	<!-- 						Papel -->
	<!-- 					</a> -->
	<!-- 					<b class="arrow"></b> -->
	<!-- 				</li> -->
				
				<li id="users" class="">
					<a href="#app/users">
						<i class="menu-icon fa fa-caret-right"></i>
						Usuário
					</a>
					<b class="arrow"></b>
				</li>
				
	
							
						</ul>
					</li>
				</ul>
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
			</div>
		
		</security:authorize>
		
		<div class="main-content">
			<div class="main-content-inner">
				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">Home</a>
						</li>
						<li class="active">Gamification</li>
					</ul>
				</div>
				<div class="page-content">
					<div class="page-header">
						<h1>Bem vindo Professor</h1>
					</div>
					<div class="main-principal">
						<!-- AQUI DENTRO SERÃ INSERIDO VIA ENGINE DE TEMPLATES OS FORMS E PAGES-->
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-inner">
				<div class="footer-content">
					<span class="bigger-120">
						<span class="blue bolder">Estudy Game</span>
						2016.2
					</span>
				</div>
			</div>
		</div>
		<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
			<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
		</a>
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>