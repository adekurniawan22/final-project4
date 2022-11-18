'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('SocialMedia', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'socialmedia_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addConstraint('SocialMedia', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'socialmedia_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
