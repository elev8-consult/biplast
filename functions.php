<?php

// Enqueue scripts and styles
function enqueue_react_and_tailwind() {
    wp_enqueue_script('react-script', get_template_directory_uri() . '/dist/bundle.js', array(), '1.0', true);
    wp_enqueue_style('tailwind-styles', get_template_directory_uri() . '/dist/styles.css', array(), '1.0');

    $inline_script = 'window.themeDirectory = "' . get_template_directory_uri() . '";';
    wp_add_inline_script('react-script', $inline_script, 'before');
}
add_action('wp_enqueue_scripts', 'enqueue_react_and_tailwind');

// Add theme support for post thumbnails
function theme_setup() {
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'theme_setup');

// Register Custom Post Type and Taxonomies
function register_product_post_type() {
    // Register Custom Post Type: Product
    $args = array(
        'labels' => array(
            'name' => 'Products',
            'singular_name' => 'Product',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-products',
        'show_in_rest' => true,
        'rest_base' => 'products',
    );
    register_post_type('product', $args);

    // Register Taxonomies
    $taxonomies = array(
        'product_category' => 'Product Category',
        'product_material' => 'Material',
        'product_neck_connection' => 'Neck Connection',
        'product_shape' => 'Shape',
        'product_market_segment' => 'Market Segment',
    );

    foreach ($taxonomies as $taxonomy_name => $taxonomy_label) {
        register_taxonomy($taxonomy_name, 'product', array(
            'label' => $taxonomy_label,
            'hierarchical' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'rest_base' => $taxonomy_name,
            'query_var' => true,
        ));
    }
}
add_action('init', 'register_product_post_type');

// adding acf fields

if( function_exists('acf_add_local_field_group') ):

    acf_add_local_field_group(array(
        'key' => 'group_product_specifications',
        'title' => 'Product Specifications',
        'fields' => array(
            array(
                'key' => 'field_reference_id',
                'label' => 'Reference ID',
                'name' => 'reference_id',
                'type' => 'text',
                'required' => 1,
            ),
            array(
                'key' => 'field_volume',
                'label' => 'Volume (ml)',
                'name' => 'volume',
                'type' => 'number',
                'min' => 1,
                'max' => 10000,
            ),
            array(
                'key' => 'field_weight',
                'label' => 'Weight',
                'name' => 'weight',
                'type' => 'number',
            ),
            array(
                'key' => 'field_pcr_possible',
                'label' => 'PCR Possible',
                'name' => 'pcr_possible',
                'type' => 'true_false',
                'ui' => 1,
            ),
            array(
                'key' => 'field_neck_type',
                'label' => 'Neck Type',
                'name' => 'neck_type',
                'type' => 'text',
            ),
            array(
                'key' => 'field_minimum_order_quantity',
                'label' => 'Minimum Order Quantity',
                'name' => 'minimum_order_quantity',
                'type' => 'number',
            ),
            array(
                'key' => 'field_decoration',
                'label' => 'Decoration',
                'name' => 'decoration',
                'type' => 'select',
                'choices' => array(
                    'sleeve' => 'Sleeve',
                    'iml' => 'IML',
                    'printed' => 'Printed',
                ),
                'multiple' => 1,
                'ui' => 1,
            ),
            array(
                'key' => 'field_image_1',
                'label' => 'Product Image 1',
                'name' => 'image_1',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'medium',
                'library' => 'all',
            ),
            array(
                'key' => 'field_image_2',
                'label' => 'Product Image 2',
                'name' => 'image_2',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'medium',
                'library' => 'all',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'product',
                ),
            ),
        ),
        'show_in_rest' => true,
    ));
    
    endif;
    
    // Make sure custom fields are visible in REST API
    function add_product_meta_to_api() {
        register_rest_field('product', 'product_details', array(
            'get_callback' => function($object) {
                $image_1 = get_field('image_1', $object['id']);
                $image_2 = get_field('image_2', $object['id']);
                return array(
                    'reference_id' => get_field('reference_id', $object['id']),
                    'volume' => get_field('volume', $object['id']),
                    'weight' => get_field('weight', $object['id']),
                    'pcr_possible' => get_field('pcr_possible', $object['id']),
                    'neck_type' => get_field('neck_type', $object['id']),
                    'minimum_order_quantity' => get_field('minimum_order_quantity', $object['id']),
                    'decoration' => get_field('decoration', $object['id']),
                    'image_1' => $image_1 ? array(
                        'url' => $image_1['url'],
                        'alt' => $image_1['alt']
                    ) : null,
                    'image_2' => $image_2 ? array(
                        'url' => $image_2['url'],
                        'alt' => $image_2['alt']
                    ) : null,
                );
            },
            'update_callback' => null,
            'schema' => null,
        ));
    }
    add_action('rest_api_init', 'add_product_meta_to_api');

// Add filter to products archive page
function add_product_filters() {
    if (is_post_type_archive('product')) {
        $taxonomies = array(
            'product_category' => 'Product Category',
            'product_material' => 'Material',
            'product_neck_connection' => 'Neck Connection',
            'product_shape' => 'Shape',
            'product_market_segment' => 'Market Segment',
        );

        echo '<div class="product-filters">';
        foreach ($taxonomies as $taxonomy => $label) {
            $terms = get_terms(array('taxonomy' => $taxonomy, 'hide_empty' => false));
            if ($terms) {
                echo '<select name="' . esc_attr($taxonomy) . '" id="' . esc_attr($taxonomy) . '">';
                echo '<option value="">' . esc_html($label) . '</option>';
                foreach ($terms as $term) {
                    echo '<option value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                }
                echo '</select>';
            }
        }
        echo '<input type="number" name="min_volume" placeholder="Min Volume">';
        echo '<input type="number" name="max_volume" placeholder="Max Volume">';
        echo '<button id="apply-filters">Apply Filters</button>';
        echo '</div>';

        // Add JavaScript to handle filtering
        ?>
        <script>
        document.getElementById('apply-filters').addEventListener('click', function() {
            var url = new URL(window.location);
            var selects = document.querySelectorAll('.product-filters select');
            selects.forEach(function(select) {
                if (select.value) {
                    url.searchParams.set(select.name, select.value);
                } else {
                    url.searchParams.delete(select.name);
                }
            });
            var minVolume = document.querySelector('input[name="min_volume"]').value;
            var maxVolume = document.querySelector('input[name="max_volume"]').value;
            if (minVolume) url.searchParams.set('min_volume', minVolume);
            if (maxVolume) url.searchParams.set('max_volume', maxVolume);
            window.location = url;
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'add_product_filters');

// Modify product query based on filters
function filter_products_query($query) {
    if (!is_admin() && $query->is_main_query() && is_post_type_archive('product')) {
        $tax_query = array();

        $taxonomies = array('product_category', 'product_material', 'product_neck_connection', 'product_shape', 'product_market_segment');
        foreach ($taxonomies as $taxonomy) {
            if (isset($_GET[$taxonomy])) {
                $tax_query[] = array(
                    'taxonomy' => $taxonomy,
                    'field' => 'slug',
                    'terms' => sanitize_text_field($_GET[$taxonomy]),
                );
            }
        }

        if (!empty($tax_query)) {
            $query->set('tax_query', $tax_query);
        }

        // Filter by volume
        $meta_query = array();
        if (isset($_GET['min_volume']) || isset($_GET['max_volume'])) {
            $volume_query = array('key' => 'volume', 'type' => 'NUMERIC');
            if (isset($_GET['min_volume'])) {
                $volume_query['value'] = intval($_GET['min_volume']);
                $volume_query['compare'] = '>=';
            }
            if (isset($_GET['max_volume'])) {
                if (isset($volume_query['value'])) {
                    $volume_query['compare'] = 'BETWEEN';
                    $volume_query['value'] = array($volume_query['value'], intval($_GET['max_volume']));
                } else {
                    $volume_query['value'] = intval($_GET['max_volume']);
                    $volume_query['compare'] = '<=';
                }
            }
            $meta_query[] = $volume_query;
        }

        if (!empty($meta_query)) {
            $query->set('meta_query', $meta_query);
        }
    }
}
add_action('pre_get_posts', 'filter_products_query');

// Debug REST API routes
add_action('rest_api_init', function () {
    error_log('REST API routes:');
    $routes = rest_get_server()->get_routes();
    foreach ($routes as $route => $details) {
        error_log($route);
    }
});

// Add CORS headers
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');


// New code for email functionality
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/send-quote-email', array(
        'methods' => 'POST',
        'callback' => 'send_quote_email',
        'permission_callback' => '__return_true'
    ));
});

function send_quote_email($request) {
    $params = $request->get_params();
    $full_name = sanitize_text_field($params['fullName']);
    $company_name = sanitize_text_field($params['companyName']);
    $email = sanitize_email($params['email']);
    $quote_details = wp_kses_post($params['quoteDetails']);

    $to = 'meraachlym@gmail.com'; // Replace with your sales email address
    $subject = 'New Quote Request from ' . $full_name;

    $message = "Full Name: $full_name\n";
    $message .= "Company Name: $company_name\n";
    $message .= "Email: $email\n\n";
    $message .= "Quote Details:\n$quote_details";

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    $sent = wp_mail($to, $subject, $message, $headers);

    if ($sent) {
        return new WP_REST_Response(array('message' => 'Email sent successfully'), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Failed to send email'), 500);
    }
}