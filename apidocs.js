/**
 * @swagger
 * components:
 *   schemas:
 *     Donor:
 *       type: object
 *       required:
 *         - name
 *         - bloodgroup
 *         - email
 *         - password
 *         - mobile
 *         - age
 *         - city
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the donor
 *         name:
 *           type: string
 *           description: Name of Donor
 *         bloodgroup:
 *           type: string
 *           description: Blood Group of Donor
 *         email:
 *           type: string
 *           description: Email of Donor
 *         password:
 *           type: string
 *           description: Password of Donor (It will encrypted)
 *         mobile:
 *           type: string
 *           description: Mobile of Donor
 *         age:
 *           type: string
 *           description: Age of Donor
 *         city:
 *           type: string
 *           description: City of Donor
 *         donated:
 *           type: Date
 *           description: Blood Donation Date of Donor
 *           default: null
 * 
 *       example:
 *         name: ritik
 *         bloodgroup: A+
 *         email: ritik@gmail.com
 *         password: ritik
 *         mobile: 1234567890
 *         age: 21
 *         city: bhopal
 */


 /**
  * @swagger
  * tags:
  *   name: Donors
  *   description: Donor Managing API
  */

// Donor Routes (Start) 

/**
 * @swagger
 * /donors:
 *   get:
 *     summary: Returns the list of all the donors
 *     tags: [Donors]
 *     responses:
 *       200:
 *         description: The list of the donors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donor'
 */

/**
 * @swagger
 * /donors/register:
 *   post:
 *     summary: Donor Can Register
 *     tags: [Donors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donor'
 *     responses:
 *       201:
 *         description: Donor Registered Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donor'
 *       500:
 *         description: Some server error
 */



 /**
  * @swagger
  * /donors/login:
  *   post:
  *     summary: Donor Login
  *     tags: [Donors]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Donor'
  *     responses:
  *       200:
  *         description: Login Successfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Donor'
  *       409:
  *         description: Something Went Wrong, Try Again
  */
 
 /**
  * @swagger
  * /donors/profile:
  *   get:
  *     summary: LoggedIn Donor Profile
  *     tags: [Donors]
  *     responses:
  *       200:
  *         description: LoggedIn Donor's Profile
  *         contens:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Donor'
  *       404:
  *         description: Donor was not found
  */
 
 /**
  * @swagger
  * /donors/donated:
  *   put:
  *     summary: Donor Blood Donated Updation
  *     tags: [Donors]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Donor'
  *     responses:
  *       201:
  *         description: Congrats You have donated blood
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Donor'
  *       500:
  *         description: Something Went Wrong, Try Again
  */
 
 /**
  * @swagger
  * /donors/search:
  *   get:
  *     summary: Get list of donors based on city and blood group
  *     tags: [Donors]
  *     parameters:
  *       - in: path
  *         name: city
  *         schema:
  *           type: string
  *         required: true
  *         description: City
  *     responses:
  *       200:
  *         description: List of the Donors Based on Your Search
  *         contens:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Donor'
  *       404:
  *         description: Donor was not found
  */
 
