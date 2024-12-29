import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { pictureBucket, publicPictureBucket } from './storage/resource';

defineBackend({
  auth,
  data,
  pictureBucket,
  publicPictureBucket
});
