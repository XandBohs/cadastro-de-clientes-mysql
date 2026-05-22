<?php include_once('config.php');
if(isset($_REQUEST['editId']) and $_REQUEST['editId']!=""){
	$row	=	$db->getAllRecords('dadoscliente','*',' AND id="'.$_REQUEST['editId'].'"');
}

if(isset($_REQUEST['submit']) and $_REQUEST['submit']!=""){
	extract($_REQUEST);
	if($nome==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=un&editId='.$_REQUEST['editId']);
		exit;
	}elseif($email==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=ue&editId='.$_REQUEST['editId']);
		exit;
	}elseif($telefone==""){
		header('location:'.$_SERVER['PHP_SELF'].'?msg=up&editId='.$_REQUEST['editId']);
		exit;
	}
	$data	=	array(
					'nome'=>$nome,
					'email'=>$email,
					'telefone'=>$telefone,
					);
	$update	=	$db->update('dadoscliente',$data,array('id'=>$editId));
	if($update){
		header('location: browse-users.php?msg=rus');
		exit;
	}else{
		header('location: browse-users.php?msg=rnu');
		exit;
	}
}
?>
<!doctype html>
<html lang="pt-br" xmlns:fb="https://www.facebook.com/2008/fbml" xmlns:addthis="https://www.addthis.com/help/api-spec"  prefix="og: http://ogp.me/ns#" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>PHP CRUD EDITAR</title>
	
	<!--<link rel="shortcut icon" href="https://demo.learncodeweb.com/favicon.ico"> icon da pagina--->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>

<body>
	
	<div class="bg-light border-bottom shadow-sm sticky-top">
		<div class="container">
			<header class="blog-header py-1">
			<nav class="navbar navbar-expand-lg navbar-light bg-light"> <a class="navbar-brand text-muted p-0 m-0" href="#"></a> <!--caso queira adiciona imagem so muda campo acima--->					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto">
						

					
					
				

					<!---caso queira adiciona menu de navegaçao adicona aqui---->

					

						</ul>
						<form method="get" action="#" class="d-flex my-2 my-lg-0">
							<div class="input-group input-group-md">
								<!--<input type="text" class="form-control search-width" name="s" id="search" value="" placeholder="Search..." aria-label="Search">-->
								<div>
									<!--<button type="submit" class="btn btn-primary" id="searchBtn"><i class="bi bi-search"></i></button>--->
								</div>
							</div>
						</form>
					</div>
				</nav>
			</header>
		</div> <!--/.container-->
	</div>
	
	
   	<div class="container">
		<h1><a href="#">PHP CRUD em Bootstrap Edição</a></h1>
		<?php
		if(isset($_REQUEST['msg']) and $_REQUEST['msg']=="un"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Nome do cliente é campo obrigatório!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="ue"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> O e-mail do cliente é um campo obrigatório!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="up"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> O telefone do cliente é um campo obrigatório!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="ras"){
			echo	'<div class="alert alert-success"><i class="bi bi-hand-thumbs-up"></i> Registro adicionado com sucesso!</div>';
		}elseif(isset($_REQUEST['msg']) and $_REQUEST['msg']=="rna"){
			echo	'<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Registro não adicionado <strong>Por favor, tente de novo!</strong></div>';
		}
		?>
		<div class="card">
			<div class="card-header"><i class="bi bi-plus-circle"></i> <strong>Adicionar cliente</strong> <a href="browse-users.php" class="float-end btn btn-dark btn-sm"><i class="bi bi-globe"></i> Procurar clientes</a></div>
			<div class="card-body">
				
				<div class="col-sm-6">
					<h5 class="card-title">Campos com<span class="text-danger">*</span> são obrigatórios!</h5>
					<form method="post">
						<div class="mb-3">
							<label>Nome do cliente<span class="text-danger">*</span></label>
							<input type="text" name="nome" id="nome" class="form-control" value="<?php echo $row[0]['nome']; ?>" placeholder="Digite o nome do cliente" required>
						</div>
						<div class="mb-3">
							<label>E-mail do cliente <span class="text-danger">*</span></label>
							<input type="email" name="email" id="email" class="form-control" value="<?php echo $row[0]['email']; ?>" placeholder="Digite o e-mail do cliente" required>
						</div>
						<div class="mb-3">
							<label>Telefone do cliente <span class="text-danger">*</span></label>
							<input type="tel" name="telefone" id="telefone" maxlength="15" class="form-control" value="<?php echo $row[0]['telefone']; ?>" placeholder="Digite o telefone do cliente" required>
						</div>
						<div class="mb-3">
							<input type="hidden" name="editId" id="editId" value="<?php echo $_REQUEST['editId']?>">
							<button type="submit" name="submit" value="submit" id="submit" class="btn btn-primary"><i class="bi bi-pencil-square"></i> Atualizar o cliente/Update cliente</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    
</body>

<!----Mascara telefone JS---->
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
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
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

<!----Mascara telefone JS---->


</html>