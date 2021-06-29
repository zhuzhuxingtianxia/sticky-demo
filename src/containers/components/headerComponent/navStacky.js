
class NavStacky {

    rootRoute = undefined
    //记录根路由
    constructor() {
        if (!this.rootRoute) {
            this.rootRoute = window.location.pathname
        }
    }

    isRootRoute = ()=> {
        if (this.rootRoute && this.rootRoute === window.location.pathname) {
            return true
        }
        return false;
    }

}

export default new NavStacky();