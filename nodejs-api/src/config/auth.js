/**
 * objeto con la configuracion incial de el 
 * modulo de authenticacion oauth
 * 
 * @author Jefferson Lara <jetox21@gmail.com>
 */

module.exports = {
    /**
     * ruta donde se encuentra el objeto con los metodos necesarios para el funcionamiento de oauth
     *
     * @var model
     */
    model:'controllers/oauthController',
    /**
     *
     * @var grants
     */
    grants:['password','client_credentials','refresh_token'],
    /**
     *
     *
     * @var debug
     */
    debug:true,
    /**
     *
     *
     * @var accessTokenLifetime
     */
    accessTokenLifetime:null
    
}
