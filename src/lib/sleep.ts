export async function threadSleep(ms: number) {
    await new Promise(r => setTimeout(r, ms))
}