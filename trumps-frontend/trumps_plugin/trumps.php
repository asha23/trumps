<?php

/**
  * @wordpress-plugin
  * Plugin Name: Trumps
  * Plugin URI: http://github.com/asha23
  * Description: Just a simple plugin to hook up the Trumps Application
  * Version: 0.0.1
  * Author: Ash Whiting
  * Author URI: http://ashwhiting.com
*/

// Get scripts and class

function trumps_init() {
    wp_enqueue_script( 'trumps-js', plugins_url( 'build/static/js/main.bbfa2697.js', __FILE__ ), array(),  '0.0.1', true );
    wp_enqueue_style( 'trumps-style', plugins_url('build/static/css/main.281cc063.css', __FILE__));
}

add_action('wp_enqueue_scripts','trumps_init');

// Do the shortcode

function trumps_shortcode() {
  echo '<div id="root"></div>';
}

add_shortcode('trumps', 'trumps_shortcode');
