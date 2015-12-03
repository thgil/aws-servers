'use strict';

import express from 'express';
import controller from './email.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.post('/', controller.add);

module.exports = router;
