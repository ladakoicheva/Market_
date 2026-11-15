export const getErrorReq = (error) => { return { ok: false, e: error?.message || String(error) } }
export const getSuccessReq = (data) =>{return {ok:true,data}}