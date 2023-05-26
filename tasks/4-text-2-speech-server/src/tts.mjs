import { TaskExecutor } from "yajsapi";

const EXECUTOR_CONFIG = {
    package: "1e88943d64a9175ab9855ebb2d628b4728b6656b2730541899d15b63",
    maxParallelTasks: 16,
    budget: 10
};

async function tts(text, filepath) {
    const executor = await TaskExecutor.create(EXECUTOR_CONFIG);
    await executor.run(async (ctx) => {
        const results = await ctx
            .beginBatch()
            .run(
                `espeak "${text}" -v "en" -s 150 -p 50 -a 200 -g 10 -w /golem/output/result.wav && ffmpeg -i /golem/output/result.wav /golem/output/result.mp3`
            )
            .downloadFile("/golem/output/result.mp3", filepath)
            .end()
            .catch((e) => console.error(e));

        const succeed = results.reduce((pv, cr) => pv && cr.result === 'Ok', true);
        if(!succeed) {
            throw new Error("Error occurred during generation TTS on provider machine.")
        }
    });
}

export default tts;
