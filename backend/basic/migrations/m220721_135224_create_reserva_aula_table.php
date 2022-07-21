<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%reserva_aula}}`.
 */
class m220721_135224_create_reserva_aula_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%reserva_aula}}', [
            'id' => $this->primaryKey(),
            'id_aula' => $this->integer()->notNull(),
            'fh_desde' => $this->dateTime(),
            'fh_hasta' => $this->dateTime(),
            'detalle' => $this->text(),
        ]);

        $this->addForeignKey(
            'fk-id-reserva-aula_aula',
            'reserva_aula',
            'id_aula',
            'aula',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%reserva_aula}}');
    }
}
