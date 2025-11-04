module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define("Properties", {
    propertyTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  

    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    agentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    agentNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    agentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Properties;
};
