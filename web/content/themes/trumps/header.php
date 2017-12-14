<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" >
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" >
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html >
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
