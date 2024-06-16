import { auth } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: 'http://localhost:3000/api/my/user',
  issuerBaseURL: 'https://dev-nbl6ke8i55u228gb.us.auth0.com',
  tokenSigningAlg: 'RS256'
})

export default checkJwt;