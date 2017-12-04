<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf1c01ade4c447bd3d6b2b7dff990d053
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PhilippBaschke\\ACFProInstaller\\' => 31,
        ),
        'D' => 
        array (
            'Dotenv\\' => 7,
        ),
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PhilippBaschke\\ACFProInstaller\\' => 
        array (
            0 => __DIR__ . '/..' . '/philippbaschke/acf-pro-installer/src/ACFProInstaller',
        ),
        'Dotenv\\' => 
        array (
            0 => __DIR__ . '/..' . '/vlucas/phpdotenv/src',
        ),
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static $prefixesPsr0 = array (
        'j' => 
        array (
            'johnpbloch\\Composer\\' => 
            array (
                0 => __DIR__ . '/..' . '/johnpbloch/wordpress-core-installer/src',
            ),
        ),
        'E' => 
        array (
            'Env' => 
            array (
                0 => __DIR__ . '/..' . '/oscarotero/env/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf1c01ade4c447bd3d6b2b7dff990d053::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf1c01ade4c447bd3d6b2b7dff990d053::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitf1c01ade4c447bd3d6b2b7dff990d053::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
