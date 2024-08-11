// app/models/dummyData.js
const { category, storyCountry, storyRole, narrative, configuration, language } = require('../models');

const dummyData = async () => {
  try {
    await category.bulkCreate([
      { name: 'Romantic' },
      { name: 'Sci-Fi' },
      { name: 'Adventure' },
    ]);

    await storyCountry.bulkCreate([
      { name: 'France' },
      { name: 'Japan' },
      { name: 'Brazil' },
    ]);

    await storyRole.bulkCreate([
      { name: 'Hero' },
      { name: 'Villain' },
      { name: 'Explorer' },
    ]);

    await narrative.bulkCreate([
      { name: 'Romantic' },
      { name: 'Longer' },
      { name: 'Scarier' },
    ]);

    await configuration.bulkCreate([
      { name: 'Town' },
      { name: 'Village' },
      { name: 'Beach' },
    ]);

    await language.bulkCreate([
      { name: 'English' },
      { name: 'Spanish' },
      { name: 'French' },
    ]);

    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

module.exports = dummyData;
