/**
 * @swagger
 * /api/master-data/provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of provinces
 */
router.get('/provinces', protect, getProvinces);

/**
 * @swagger
 * /api/master-data/districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of districts
 */
router.get('/districts', protect, getDistricts);

/**
 * @swagger
 * /api/master-data/police-stations:
 *   get:
 *     summary: Get all police stations
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of police stations
 */
router.get('/police-stations', protect, getPoliceStations);