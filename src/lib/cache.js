// TODO (you): an in-memory cache where each entry expires after a set time.
// It needs a way to get a value (counting a hit or a miss), store a value,
// and report { entries, hits, misses, ttlSeconds }. The exact counting rules
// are on the assignment page. A Map with { value, expiresAt } entries works well.
export class Cache {

    constructor(ttlSeconds) {
        this.ttlSeconds = ttlSeconds;
        this.cache = new Map();
        this.hits = 0;
        this.misses = 0;
    }

    get(key) {
        const entry = this.cache.get(key);

        if (entry && Date.now() < entry.expiresAt) {
            this.hits++;
            return entry.value;
        }

        this.misses++;

        if (entry) {
            this.cache.delete(key);
        }

        return undefined;
    }

    set(key, value) {
        this.cache.set(key, {
            value: value,
            expiresAt: Date.now() + this.ttlSeconds * 1000
        });
    }

    getStats() {
        return {
            entries: this.cache.size,
            hits: this.hits,
            misses: this.misses,
            ttlSeconds: this.ttlSeconds
        };
    }
}
