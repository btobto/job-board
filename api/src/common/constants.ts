export const enum MongoErrorCodes {
  DUPLICATE_KEY = 11000,
}

export const USER_TYPE_KEY = 'userType';
export const IS_PUBLIC_KEY = 'isPublic';

export const FILE_UPLOAD_DEST = 'uploads';

export const COMPANY_ADD_RATING_FIELD = {
  rating: {
    $cond: [
      { $eq: ['$ratingsCount', 0] },
      0,
      { $divide: ['$ratingsSum', '$ratingsCount'] },
    ],
  },
};

export const COMPANY_REMOVE_FIELDS = { hashedPassword: 0, ratingsSum: 0 };

export const POSTING_REMOVE_WEIGHTS = {
  skillsMatch: 0,
  countryMatch: 0,
  cityMatch: 0,
  remoteMatch: 0,
  positionMatch: 0,
  totalWeight: 0,
};
