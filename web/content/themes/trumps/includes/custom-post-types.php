<?php

// Use this file to create custom post types.

  add_action( 'init', 'trumps_cpt' );
  function trumps_cpt() {
  	$labels = array(
  		'name'               => _x( 'Trumps', 'post type general name', 'trumps-textdomain' ),
  		'singular_name'      => _x( 'Trumps', 'post type singular name', 'trumps-textdomain' ),
  		'menu_name'          => _x( 'Trumps', 'admin menu', 'trumps-textdomain' ),
  		'name_admin_bar'     => _x( 'Trumps', 'add new on admin bar', 'trumps-textdomain' ),
  		'add_new'            => _x( 'Add New', 'trumps', 'trumps-textdomain' ),
  		'add_new_item'       => __( 'Add New Trumps', 'trumps-textdomain' ),
  		'new_item'           => __( 'New Trumps', 'trumps-textdomain' ),
  		'edit_item'          => __( 'Edit Trumps', 'trumps-textdomain' ),
  		'view_item'          => __( 'View Trumps', 'trumps-textdomain' ),
  		'all_items'          => __( 'All Trumps', 'trumps-textdomain' ),
  		'search_items'       => __( 'Search Trumps', 'trumps-textdomain' ),
  		'parent_item_colon'  => __( 'Parent Trumps:', 'trumps-textdomain' ),
  		'not_found'          => __( 'No trumps found.', 'trumps-textdomain' ),
  		'not_found_in_trash' => __( 'No trumps found in Trash.', 'trumps-textdomain' )
  	);

  	$args = array(
  		'labels'             => $labels,
  		'description'        => __( 'Description.', 'trumps-textdomain' ),
  		'public'             => true,
  		'publicly_queryable' => true,
  		'show_ui'            => true,
  		'show_in_menu'       => true,
  		'query_var'          => true,
  		'rewrite'            => array( 'slug' => 'trumps' ),
  		'capability_type'    => 'post',
  		'has_archive'        => true,
  		'hierarchical'       => false,
  		'menu_position'      => null,
  		'show_in_rest'       => true,
  		'rest_base'          => 'trumps-api',
  		'rest_controller_class' => 'WP_REST_Posts_Controller',
  		'supports'           => array( 'title', 'author' )
  	);

  	register_post_type( 'trumps', $args );
}
