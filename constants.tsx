
import { Lesson } from './types';

export const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Space']
];

const generateStandardLessons = (): Lesson[] => {
  const commonWords = [
    "the quick brown fox jumps over the lazy dog",
    "practice makes perfect when learning to type",
    "a journey of a thousand miles begins with a single step",
    "to be or not to be that is the question",
    "all that glitters is not gold",
    "consistency is the key to mastering any new skill",
    "typing speed will improve with daily deliberate practice",
    "focus on accuracy first then speed will follow naturally",
    "rhythm and flow are essential for high speed typing",
    "never look down at your hands while typing",
    "use all ten fingers for maximum efficiency",
    "the home row is your base of operations",
    "keep your wrists elevated and back straight",
    "take frequent breaks to avoid repetitive strain",
    "mechanical keyboards provide excellent tactile feedback",
    "typing is a fundamental skill in the digital age",
    "software engineers spend hours typing code every day",
    "writers find their flow through the clicking of keys",
    "the sound of a busy office is often the sound of typing",
    "digital nomads work from anywhere with their laptops",
    "high speed internet has changed the world forever",
    "artificial intelligence is transforming our lives",
    "machine learning models require massive amounts of data",
    "quantum computing represents the next frontier",
    "blockchain technology enables decentralized systems",
    "cybersecurity is a critical concern for businesses",
    "cloud computing provides scalable infrastructure",
    "data science helps us make better decisions",
    "user experience design focuses on the human element",
    "agile methodologies improve software development cycles",
    "open source software encourages collaboration",
    "web development involves html css and javascript",
    "mobile apps are ubiquitous in modern society",
    "social media connects people across the globe",
    "e-commerce has revolutionized the way we shop",
    "virtual reality creates immersive digital experiences",
    "augmented reality overlays data on the real world",
    "the internet of things connects physical devices",
    "big data analytics reveals hidden patterns",
    "fintech innovations are changing banking",
    "edtech platforms provide accessible learning",
    "healthtech improves patient outcomes with data",
    "clean energy is essential for a sustainable future",
    "space exploration continues to inspire humanity",
    "robotics automates complex and dangerous tasks",
    "biotechnology advances our understanding of life",
    "nanotechnology operates at the scale of atoms",
    "autonomous vehicles will redefine transportation",
    "smart cities use data to improve urban living",
    "digital privacy is a fundamental human right"
  ];

  return commonWords.map((text, i) => ({
    id: `s-${i}`,
    title: `Standard Exercise ${i + 1}`,
    difficulty: i < 20 ? 'Beginner' : i < 40 ? 'Intermediate' : 'Advanced',
    category: 'Standard',
    description: 'General purpose typing practice.',
    text
  }));
};

const generateCodingLessons = (): Lesson[] => {
  const snippets = [
    // JavaScript - Fundamentals
    "console.log('Hello, World!');",
    "const sum = (a, b) => a + b;",
    "for (let i = 0; i < 10; i++) { console.log(i); }",
    "if (isValid) { processData(); } else { handleError(); }",
    "const [count, setCount] = useState(0);",
    "useEffect(() => { fetchData(); }, []);",
    
    // JavaScript - Advanced/Patterns
    "const fetchData = async () => { try { const response = await fetch('/api/data'); return await response.json(); } catch (e) { console.error(e); } };",
    "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);",
    "const handler = useCallback((e) => { e.preventDefault(); console.log(e.target.value); }, []);",
    "const { name, age, ...rest } = userProfile;",
    "const updatedList = [...oldList, { id: Date.now(), text: 'New Item' }];",
    "const result = items.filter(i => i.active).map(i => i.name).sort();",
    "Promise.all([p1, p2, p3]).then(results => console.log(results));",
    "const config = Object.freeze({ api: 'https://v1.api', timeout: 5000 });",
    "class Singleton { constructor() { if (!Singleton.instance) Singleton.instance = this; return Singleton.instance; } }",
    "function* generator(i) { yield i; yield i + 10; }",
    "const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);",
    
    // Python - Fundamentals
    "print('Hello, Python')",
    "def add(a, b): return a + b",
    "if __name__ == '__main__': main()",
    "for i in range(10): print(f'Count: {i}')",
    "items = [1, 2, 3, 4, 5]",
    "user = {'name': 'Alice', 'role': 'Admin'}",
    
    // Python - List Comprehensions & Advanced
    "squares = [x**2 for x in range(10) if x % 2 == 0]",
    "names = {user.id: user.name for user in users}",
    "async def fetch_data(session, url): async with session.get(url) as response: return await response.json()",
    "class BaseUser(models.Model): name = models.CharField(max_length=100); email = models.EmailField()",
    "with open('data.csv', 'r') as f: reader = csv.DictReader(f); data = list(reader)",
    "lambda x, y: x * y if x > y else y / x",
    "def decorator(func): def wrapper(*args, **kwargs): return func(*args, **kwargs); return wrapper",
    "@property def full_name(self): return f'{self.first} {self.last}'",
    "import pandas as pd; df = pd.read_csv('stats.csv'); print(df.describe())",
    "import numpy as np; a = np.array([1, 2, 3]); b = np.exp(a)",
    "from typing import List, Optional, Union",
    "def process_items(items: List[int]) -> Optional[int]: return sum(items) if items else None",
    
    // Web Development & Tools
    "npm install --save-dev typescript @types/node",
    "git commit -m 'feat: add authentication layer' --no-verify",
    "docker build -t app-service:latest .",
    "kubectl rollout restart deployment/web-server",
    "SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.author_id WHERE u.active = true;",
    "body { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }",
    "flex-direction: column; justify-content: space-between; align-items: center;",
    "const theme = localStorage.getItem('theme') || 'system';",
    "window.matchMedia('(prefers-color-scheme: dark)').matches",
    
    // More complex JS Architecture
    "export const authSlice = createSlice({ name: 'auth', initialState, reducers: { login: (state, action) => { state.user = action.payload; } } });",
    "const middleware = store => next => action => { console.log('Dispatching:', action); return next(action); };",
    "export default async function handler(req, res) { if (req.method === 'POST') { const data = req.body; res.status(200).json(data); } }",
    
    // More complex Python
    "try: response = requests.get(url, timeout=10) except requests.exceptions.Timeout: handle_timeout()",
    "class DataProcessor: def __init__(self, source): self.source = source; def run(self): pass",
    "django.contrib.auth.models.User.objects.filter(is_active=True).order_by('-date_joined')",
    "app = Flask(__name__); @app.route('/') def home(): return render_template('index.html')",
    "plt.plot(x, y); plt.xlabel('Time'); plt.ylabel('Value'); plt.show()",
    "tensor = torch.randn(3, 3); output = model(tensor)",
    "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)",
    "model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])",
    
    // Coding Logic Puzzles
    "const fib = n => n <= 1 ? n : fib(n - 1) + fib(n - 2);",
    "def is_palindrome(s): return s == s[::-1]",
    "const isAnagram = (s, t) => s.split('').sort().join('') === t.split('').sort().join('');",
    "const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);",
    "const binarySearch = (arr, target) => { let l = 0, r = arr.length - 1; while(l <= r) { ... } };",
    
    // Extra variety snippets
    "Math.random().toString(36).substring(2, 15);",
    "process.nextTick(() => { console.log('Executing next tick callback'); });",
    "document.addEventListener('DOMContentLoaded', () => { initApp(); });",
    "const root = createRoot(document.getElementById('root'));",
    "import { motion } from 'framer-motion';",
    "const variants = { open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: '-100%' } };",
    "console.table(data);",
    "debugger;",
    "console.time('perf'); doWork(); console.timeEnd('perf');",
    "globalThis.window === window",
    "typeof undefined === 'undefined'",
    "Array.from({ length: 5 }, (_, i) => i * 2);",
    "Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');",
    "const url = new URL(window.location.href); url.searchParams.set('q', 'typing');",
    "localStorage.setItem('session', JSON.stringify({ token: 'xyz', expiry: 3600 }));",
    "const observer = new IntersectionObserver((entries) => { ... });",
    "if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); }",
    "fetch('/api', { method: 'POST', body: JSON.stringify(payload) });",
    "const blob = new Blob([data], { type: 'application/json' });",
    "const reader = new FileReader(); reader.onload = () => { ... };",
    "const worker = new Worker('worker.js'); worker.postMessage('start');",
    "window.requestAnimationFrame(updateFrame);",
    "const ctx = canvas.getContext('2d'); ctx.fillRect(0, 0, 100, 100);",
    "const audioCtx = new (window.AudioContext || window.webkitAudioContext)();",
    "navigator.geolocation.getCurrentPosition(pos => { console.log(pos); });",
    "const socket = new WebSocket('ws://localhost:8080');",
    "indexedDB.open('Store', 1);",
    "const { value, done } = await reader.read();",
    "const encoder = new TextEncoder(); const uint8 = encoder.encode('text');",
    "const hash = await crypto.subtle.digest('SHA-256', data);",
    "CSS.paintWorklet.addModule('worklet.js');",
    "document.body.style.setProperty('--main-bg', '#333');",
    "export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };",
    "type Result<T> = { success: true; data: T } | { success: false; error: string };",
    "abstract class Animal { abstract makeSound(): void; }",
    "readonly private id: string = crypto.randomUUID();",
    "namespace Utilities { export function log(msg: string) { console.log(msg); } }",
    "for await (const chunk of stream) { process(chunk); }",
    "using handle = getHandle();",
    "import type { NextPage } from 'next';",
    "const handler = (req: NextApiRequest, res: NextApiResponse) => { ... };",
    "interface User extends Base { email: string; avatar?: string; }",
    "enum LogLevel { Debug, Info, Warn, Error }",
    "const log = (msg: string, level: LogLevel = LogLevel.Info) => { ... };",
    "type Keys = keyof typeof Theme;",
    "const value = theme[key as Keys];",
    "const assertUnreachable = (x: never): never => { throw new Error(); };",
    "const isString = (val: any): val is string => typeof val === 'string';",
    "declare var __DEV__: boolean;",
    "import.meta.env.VITE_API_URL",
    "new Int32Array(buffer);",
    "const buffer = new SharedArrayBuffer(1024);",
    "Atomics.add(int32, 0, 1);",
    "const proxy = new Proxy(target, handler);",
    "Reflect.get(target, 'property');",
    "new WeakMap(); new WeakSet();",
    "const symbols = Symbol('desc');",
    "JSON.parse(data, (key, value) => { ... });",
    "new RegExp('pattern', 'gi');",
    "const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });",
    "const date = new Intl.DateTimeFormat('en-GB').format(new Date());",
    "const list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });",
    "const rel = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });",
    "performance.mark('start'); performance.measure('duration', 'start', 'end');",
    "const entry = performance.getEntriesByName('duration')[0];"
  ];

  return snippets.map((text, i) => ({
    id: `c-${i}`,
    title: `Code Snippet ${i + 1}`,
    difficulty: i < 30 ? 'Beginner' : i < 70 ? 'Intermediate' : 'Advanced',
    category: 'Coding',
    description: 'Programming syntax, JS architecture, and Python logic patterns.',
    text
  }));
};

const generateLiteratureLessons = (): Lesson[] => {
  const quotes = [
    "Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse.",
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    "Happy families are all alike; every unhappy family is unhappy in its own way.",
    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms.",
    "The sun did not shine. It was too wet to play. So we sat in the house. All that cold, cold, wet day.",
    "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this.",
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "The past is a foreign country; they do things differently there.",
    "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else.",
    "If you really want to hear about it, the first thing you will probably want to know is where I was born.",
    "It was a bright cold day in April, and the clocks were striking thirteen.",
    "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal.",
    "Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy.",
    "I am an invisible man. No, I am not a spook like those who haunted Edgar Allan Poe.",
    "The sky above the port was the color of television, tuned to a dead channel.",
    "Once upon a time and a very good time it was there was a moocow coming down along the road.",
    "Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.",
    "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days.",
    "Mother died today. Or maybe, yesterday; I can't be sure. The telegram from the Home says: Mother deceased.",
    "Lolita, light of my life, fire of my loins. My sin, my soul. Lo-lee-ta: the tip of the tongue taking a trip.",
    "The cold passed reluctantly from the earth, and the retiring fogs revealed an army stretched out on the hills.",
    "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad?",
    "A screaming comes across the sky. It has happened before, but there is nothing to compare it to now.",
    "Deep into that darkness peering, long I stood there wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.",
    "I have never begun a novel with more misgiving. If I call it a novel it is only because I don't know what else to call it.",
    "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.",
    "Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
    "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
    "It was the day my grandmother exploded. I sat in the crematorium, listening to the Reverend Mr. Gallow.",
    "I was born twice: first, as a baby girl, on a remarkably smogless Detroit day in January of 1960."
  ];

  return quotes.map((text, i) => ({
    id: `l-${i}`,
    title: `Literature Selection ${i + 1}`,
    difficulty: i < 10 ? 'Beginner' : i < 20 ? 'Intermediate' : 'Advanced',
    category: 'Literature',
    description: 'Excerpts from classic and modern literature.',
    text
  }));
};

export const INITIAL_LESSONS: Lesson[] = [
  ...generateStandardLessons(),
  ...generateCodingLessons(),
  ...generateLiteratureLessons()
];
