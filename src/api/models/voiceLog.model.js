const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const VoiceLog = sequelize.define(
    "voice_logs",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      from_phone_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      to_phone_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
      tableName: "voice_logs",
    }
  );
  VoiceLog.associate = function (models) {
    // associations can be defined here
  };

  return VoiceLog;
};
