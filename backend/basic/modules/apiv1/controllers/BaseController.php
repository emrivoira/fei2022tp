<?php

namespace app\modules\apiv1\controllers;

use yii\rest\ActiveController;
use yii\web\Response;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;

class BaseController extends ActiveController
{
    public static function allowedDomains()
    {
        return [$_SERVER["REMOTE_ADDR"], 'http://127.0.0.1:8000'];
    }

    function behaviors()
    {
        $behaviors = parent::behaviors();

        return array_merge($behaviors, [
            'corsFiter' => [
                'class' => [
                    'Origin'                            => static::allowedDomains(),
                    'Access-Control-Request-Methods'    => ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                    'Access-Control-Allow-Credentials'  => true,
                    'Access-Control-Max-Age'            => 3600,
                    'Access-Control-Allow-Headers'      => ['authorization', 'X-Requested-With', 'content-type'],
                    'Access-Control-Expose-Headers'     => ['X-Pagination-Current-Page', 'X-Pagination-Page-Count', 'X-Pagination-Total-Count'],
                ],
            ],
        ]);
    }
}
