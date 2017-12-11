<?php

/**
  * @wordpress-plugin
  * Plugin Name: Trumps
  * Plugin URI: http://github.com/asha23
  * Description: Just a simple plugin to hook up the Trumps Application
  * Version: 0.1
  * Author: Ash WP_Customize_Header_Image_Control::print_header_image_template
  * Author URI: http://ashwhiting.com
*/

// Get scripts and class

add_action('wp_enqueue_scripts','trumps_init');

function trumps_init() {
    wp_enqueue_script( 'manifest-json', plugins_url( 'build/manifest.json', __FILE__ ));
    wp_enqueue_script( 'trumps-js', plugins_url( 'build/static/js/main.b8b25e77.js', __FILE__ ));
    wp_enqueue_style( 'trumps-style', plugins_url('build/static/css/main.27057391.css', __FILE__));
}

// Do the shortcode

function trumps_shortcode() {
  echo '<div id="root"></div>';
}
add_shortcode('trumps', 'trumps_shortcode');
