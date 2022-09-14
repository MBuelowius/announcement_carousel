<?php
/**
 * Plugin Name: Annoucement Carousel
 * Description: 
 * Version: 1.0.0
 * Author: Maximilian Bülowius
 * License: MIT
 *
 * PHP Entry point for TypeScript starter template
 * This function enqueues the given script at the front-end of WordPress
 * 
 * If you want to enqueue your assets for the block editor, use the 'enqueue_block_editor_assets' action instead
 */

function custom_block_style_assets() {
  wp_enqueue_style('wp-typescript', plugins_url('/assets/public/style-blocks.css', __FILE__,), array("wp-editor"));
} 

add_action( 'enqueue_block_assets', 'custom_block_style_assets' );

function custom_blocks_assets() {
  $script_args = include( plugin_dir_path( __FILE__ ) . 'assets/public/blocks.asset.php');
  wp_enqueue_script('wp-typescript', plugins_url('/assets/public/blocks.js', __FILE__), $script_args['dependencies'], $script_args['version']);
}

add_action('enqueue_block_editor_assets', "custom_blocks_assets");

function custom_script_assets() {
  $script_args = include( plugin_dir_path( __FILE__ ) . 'assets/public/scripts.asset.php');
  wp_enqueue_script('wp-typescript', plugins_url('/assets/public/scripts.js', __FILE__), $script_args['dependencies'], '1.0.0', true);
}

add_action('wp_enqueue_scripts', 'custom_script_assets');
?>



