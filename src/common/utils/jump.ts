export const byNavigateTo = (page: string, params?: ptAny) => {
    uni.navigateTo({
        url: page
    }).then((r: ptAny) => {
    })
}

export const byRedirectTo = (page: string, params?: ptAny) => {
    uni.redirectTo({
        url: page
    }).then((r: ptAny) => {
    })
}

export const byReLaunch = (page: string, params?: ptAny) => {
    uni.reLaunch({
        url: page
    }).then((r: ptAny) => {
    })
}

export const byNavigateBack = (delta: number) => {
    uni.navigateBack({
        delta: delta
    }).then((r: ptAny) => {
    })
}

