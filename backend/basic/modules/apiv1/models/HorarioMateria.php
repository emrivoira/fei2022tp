<?php

namespace app\modules\apiv1\models;

class HorarioMateria extends \app\models\HorarioMateria
{
    public function fields()
    {
        return [
            'id',
            'fh_desde',
            'fh_hasta'
        ];
    }
}
