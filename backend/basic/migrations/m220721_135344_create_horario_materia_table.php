<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%horario_materia}}`.
 */
class m220721_135344_create_horario_materia_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%horario_materia}}', [
            'id' => $this->primaryKey(),
            'id_materia' => $this->integer()->notNull(),
            'id_reserva' => $this->integer()->notNull(),
            'fh_desde' => $this->dateTime(),
            'fh_hasta' => $this->dateTime(),
        ]);

        $this->addForeignKey(
            'fk-horario-materia_id-materia',
            'horario_materia',
            'id_materia',
            'materia',
            'id',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-horario-materia_id-reserva',
            'horario_materia',
            'id_reserva',
            'reserva_aula',
            'id',
            'CASCADE'

        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%horario_materia}}');
    }
}
