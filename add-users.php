<?php include_once('config.php');
if(isset($_REQUEST['submit']) and $_REQUEST['submit']!=""){
	extract($_REQUEST);
	if($nome==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=un');
		exit;
	}elseif($email==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=ue');
		exit;
	}elseif($telefone==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=up');
		exit;
	}else{
		$data	=	array(
					'nome'=>$nome,
					'email'=>$email,
					'telefone'=>$telefone,
				);
		$insert	=	$db->insert('dadoscliente',$data);
		if($insert){
			header('location:browse-users.php?msg=ras');
			exit;
		}else{
			header('location:browse-users.php?msg=rna');
			exit;
		}
	}
}
?>

<!doctype html>
<html lang="en-US" xmlns:fb="https://www.facebook.com/2008/fbml" xmlns:addthis="https://www.addthis.com/help/api-spec"  prefix="og: http://ogp.me/ns#" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>PHP CRUD adicionar/cadastrar</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body>
	<div class="bg-light border-bottom shadow-sm sticky-top">
		<div class="container">
			<header class="blog-header py-1">
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<a class="navbar-brand text-muted p-0 m-0" href="#"></a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<form method="get" action="#" class="d-flex my-2 my-lg-0">
							<div class="input-group input-group-md"></div>
						</form>
					</div>
				</nav>
			</header>
		</div>
	</div>

	<div class="container mt-4">
		<h1><a href="#">PHP CRUD em Bootstrap Cadastro</a></h1>
		<?php
		if(isset($_REQUEST['msg']) and $_REQUEST['msg']=="un"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> User name is mandatory field!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="ue"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> User email is mandatory field!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="up"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> User phone is mandatory field!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="ras"){
			echo	'<div class="alert alert-success"><i class="bi bi-hand-thumbs-up"></i> Record added successfully!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="rna"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Record not added <strong>Please try again!</strong></div>';
		}
		?>
		<div class="card">
			<div class="card-header"><i class="bi bi-plus-circle"></i> <strong>Cadastrar cliente</strong> <a href="browse-users.php" class="float-end btn btn-dark btn-sm"><i class="bi bi-globe"></i> Procurar clientes</a></div>
			<div class="card-body">
				<div class="col-sm-6">
					<h5 class="card-title">Campos com <span class="text-danger">*</span> são obrigatórios!</h5>
					<form method="post">
						<div class="mb-3">
							<label>Nome do cliente <span class="text-danger">*</span></label>
							<input type="text" name="nome" id="nome" class="form-control" placeholder="Digite o nome do cliente" required>
						</div>
						<div class="mb-3">
							<label>E-mail do usuário <span class="text-danger">*</span></label>
							<input type="email" name="email" id="email" class="form-control" placeholder="Digite o e-mail do cliente" required>
						</div>
						<div class="mb-3">
							<label>Telefone do usuário <span class="text-danger">*</span></label>
							<input type="tel" class="tel form-control" maxlength="15" name="telefone" id="telefone" x-autocompletetype="tel" placeholder="Digite o telefone do cliente" required>
						</div>
						<div class="mb-3">
							<button type="submit" name="submit" value="submit" id="submit" class="btn btn-primary"><i class="bi bi-plus-circle"></i> Cadastrar cliente</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

	<script>
	function mascara(o,f){
		v_obj=o
		v_fun=f
		setTimeout("execmascara()",1)
	}
	function execmascara(){
		v_obj.value=v_fun(v_obj.value)
	}
	function mtel(v){
		v=v.replace(/\D/g,"");
		v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
		v=v.replace(/(\d)(\d{4})$/,"$1-$2");
		return v;
	}
	function id( el ){
		return document.getElementById( el );
	}
	window.onload = function(){
		id('telefone').onkeyup = function(){
			mascara( this, mtel );
		}
	}
	</script>
</body>
</html>
