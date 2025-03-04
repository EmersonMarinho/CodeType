'use client'

import { useState, useEffect, useRef } from 'react'
import Stats from './Stats'
import Analysis from './Analysis'
import Ranking from './Ranking'
import Achievements from './Achievements'
import { DetailedStats, Ranking as RankingType, TestResult, UserStats } from '@/types/types'
import { Language, Settings as AppSettings, Theme, translations } from '@/types/settings'

type ProgrammingLanguage = 'JavaScript' | 'Python' | 'Java' | 'SQL' | 'TypeScript'
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type Mode = {
  id: string
  name: string
  duration: number
  description: string
}

interface Settings {
  language: Language
  theme: Theme
  difficulty: Difficulty
  programmingLanguage: ProgrammingLanguage
}

interface UserProfile {
  id: string
  username: string
  stats: {
    averageWPM: number
    bestWPM: number
    totalTime: number
    languageStats: Record<ProgrammingLanguage, {
      completed: number
      averageAccuracy: number
    }>
  }
  preferences: Settings
  history: TestResult[]
}

interface Achievement {
  id: string
  name: string
  description: string
  requirement: (stats: UserStats) => boolean
  icon: string
}

interface HeatMapData {
  character: string
  mistakes: number
  position: number
}

interface CustomSnippet {
  id: string
  code: string
  language: ProgrammingLanguage
  difficulty: Difficulty
  tags: string[]
}

interface Room {
  id: string
  players: {
    id: string
    name: string
    wpm: number
    accuracy: number
    progress: number
  }[]
  settings: Settings
  status: 'waiting' | 'playing' | 'finished'
  currentText: string
}

interface Resource {
  id: string
  title: string
  type: 'video' | 'article' | 'exercise'
  language: ProgrammingLanguage
  difficulty: Difficulty
  url: string
}

interface DailyChallenge {
  date: string
  snippet: CustomSnippet
  leaderboard: { 
    userId: string
    wpm: number
    accuracy: number
    timestamp: string 
  }[]
  rewards: Achievement[]
}

interface Dashboard {
  dailyProgress: {
    date: string
    wpm: number
    accuracy: number
    timeSpent: number
  }[]
  languageBreakdown: Record<ProgrammingLanguage, number>
  improvementGraph: {
    week: number
    averageWPM: number
    averageAccuracy: number
  }[]
}

interface TextDisplayProps {
  text: string
  inputValue: string
  combo: number
}

const categorizedTexts = {
  JavaScript: {
    Beginner: [
      "const handleSubmit = (event) => { event.preventDefault(); setData(newData); };",
      "const [state, setState] = useState(initialState);",
      "function add(a, b) { return a + b; }",
      "let numbers = [1, 2, 3].map(n => n * 2);",
      "const user = { name: 'John', age: 30 };",
      "document.querySelector('.button').addEventListener('click', handleClick);",
      "localStorage.setItem('theme', 'dark');",
      "const sum = numbers.reduce((acc, curr) => acc + curr, 0);",
      "const filtered = array.filter(item => item.active);",
      "setTimeout(() => { console.log('Delayed message'); }, 1000);"
    ],
    Intermediate: [
      "useEffect(() => { fetchData(); return () => cleanup(); }, [dependencies]);",
      "const [state, dispatch] = useReducer(reducer, initialState);",
      "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);",
      "const debounced = _.debounce(() => { saveChanges(); }, 300);",
      "Promise.all([fetchUsers(), fetchPosts()]).then(([users, posts]) => {});",
      "const { data, error } = await supabase.from('users').select();",
      "export default class Timer extends Component { componentDidMount() {} }",
      "const observable = new Observable(subscriber => { subscriber.next(1); });",
      "const worker = new Worker('worker.js');",
      "async function* generateSequence() { yield await Promise.resolve(1); }"
    ],
    Advanced: [
      "export const criarFatia = ({ nome, estadoInicial, redutores }) => {};",
      "const proxy = new Proxy(alvo, { get: (obj, prop) => Reflect.get(obj, prop) });",
      "type Armazenamento = { [K in keyof Estado]: (estado: Estado[K]) => void };",
      "const decorador = (alvo: any) => { return class extends alvo {}; };",
      "Symbol.iterador = function* () { yield* this.valores(); };",
      "new WeakMap().set(chave, { valor: 123, metadados: {} });",
      "Object.defineProperty(obj, 'prop', { get: () => this._prop });",
      "const { proxy, revogar } = Proxy.revocable(alvo, manipulador);",
      "Reflect.defineMetadata('chave', 'valor', alvo, 'propriedade');",
      "const dominio = new Realm({ transformacoes: [babel => ({ visitante: {} })] });"
    ]
  },
  Python: {
    Beginner: [
      "def greet(name): return f'Hello, {name}!'",
      "numbers = [1, 2, 3, 4, 5]",
      "for i in range(10): print(i)",
      "if x > 0: print('Positive')",
      "def calculate_sum(numbers): return sum(numbers)",
      "fruits = {'apple': 1, 'banana': 2}",
      "with open('file.txt', 'r') as f: print(f.read())",
      "try: x = 1/0\nexcept ZeroDivisionError: print('Error')",
      "class Dog: def bark(self): print('Woof!')",
      "from datetime import datetime"
    ],
    Intermediate: [
      "from typing import List, Optional",
      "def filter_list(lst): return [x for x in lst if isinstance(x, int)]",
      "@property\ndef full_name(self): return f'{self.first} {self.last}'",
      "async def fetch_data(): return await api.get('/data')",
      "from functools import reduce",
      "from collections import defaultdict, Counter",
      "import threading\nlock = threading.Lock()",
      "from abc import ABC, abstractmethod",
      "def wrapper(func): return lambda x: func(x)",
      "import json\nwith open('data.json') as f: data = json.load(f)"
    ],
    Advanced: [
      "def ordenacaoRapida(arr): return [] if not arr else ordenacaoRapida([x for x in arr[1:] if x < arr[0]]);",
      "from dataclasses import dataclass, campo",
      "async with clienteHttp.SessaoCliente() as sessao:",
      "class Meta(tipo): def __new__(cls, nome, bases, atributos):",
      "from typing import TipoVar, Generico",
      "import asyncio\nloop = asyncio.get_event_loop()",
      "from contextlib import gerenciador_contexto, gerenciador_contexto_async",
      "import multiprocessamento as mp",
      "from functools import metodo_despacho_unico",
      "import numpy as np\nfrom tensorflow import keras"
    ]
  },
  Java: {
    Beginner: [
      "public class Main { public static void main(String[] args) { } }",
      "String message = 'Hello, World!';",
      "for (int i = 0; i < 10; i++) { System.out.println(i); }",
      "if (condition) { doSomething(); } else { doOther(); }",
      "List<String> items = new ArrayList<>();",
      "public void sayHello(String name) { System.out.println('Hello ' + name); }",
      "int[] numbers = {1, 2, 3, 4, 5};",
      "try { int result = 10 / 0; } catch (Exception e) { e.printStackTrace(); }",
      "public class Person { private String name; public String getName() { return name; } }",
      "Map<String, Integer> map = new HashMap<>();"
    ],
    Intermediate: [
      "try (BufferedReader reader = new BufferedReader(new FileReader(file))) {",
      "List<String> items = Arrays.asList('a', 'b', 'c');",
      "Stream<Integer> stream = numbers.stream().filter(n -> n > 0);",
      "ExecutorService executor = Executors.newFixedThreadPool(4);",
      "Optional<User> user = Optional.ofNullable(getUser());",
      "@Autowired private UserService userService;",
      "CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> 'result');",
      "public class Singleton { private static final Singleton instance = new Singleton(); }",
      "ReentrantLock lock = new ReentrantLock();",
      "Consumer<String> consumer = System.out::println;"
    ],
    Advanced: [
      "public static <T extends Comparavel<T>> void ordenar(Lista<T> lista) {",
      "@Aspecto @Componente public class AspectoLog { @Antes('execucao(* *.*(..))') }",
      "public class MinhaClasse<T extends Comparavel<? super T>> implements Comparavel<MinhaClasse<T>> {",
      "volatile boolean sinalizador = true;",
      "synchronized void metodo() { while(condicao) { esperar(); } notificarTodos(); }",
      "BufferBytes buffer = BufferBytes.alocar(1024);",
      "Class<?> classe = Class.forName('com.exemplo.MinhaClasse');",
      "public record Pessoa(String nome, int idade) {}",
      "sealed interface Forma permits Circulo, Retangulo, Quadrado {}",
      "var resultado = switch(valor) { case 1 -> 'um'; default -> 'outro'; };"
    ]
  },
  SQL: {
    Beginner: [
      "SELECT * FROM users WHERE age > 18;",
      "INSERT INTO users (name, email) VALUES ('John', 'john@email.com');",
      "UPDATE customers SET status = 'active' WHERE id = 1;",
      "DELETE FROM orders WHERE status = 'cancelled';",
      "SELECT product_name, price FROM products ORDER BY price DESC;",
      "CREATE TABLE employees (id INT, name VARCHAR(100), salary DECIMAL);",
      "ALTER TABLE users ADD COLUMN last_login TIMESTAMP;",
      "SELECT DISTINCT category FROM products;",
      "INSERT INTO logs (event, timestamp) VALUES ('login', NOW());",
      "SELECT COUNT(*) FROM orders WHERE date >= CURRENT_DATE;"
    ],
    Intermediate: [
      "SELECT users.name, COUNT(orders.id) FROM users LEFT JOIN orders ON users.id = orders.user_id;",
      "UPDATE products SET price = price * 1.1 WHERE category = 'electronics';",
      "SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;",
      "INSERT INTO order_items (order_id, product_id, quantity) SELECT 1, id, 1 FROM products;",
      "CREATE VIEW active_users AS SELECT * FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY);",
      "SELECT user_id, SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at);",
      "CREATE INDEX idx_users_email ON users(email);",
      "SELECT COALESCE(nickname, username, 'Anonymous') AS display_name FROM users;",
      "WITH monthly_sales AS (SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS total);",
      "SELECT * FROM products WHERE price BETWEEN (SELECT AVG(price) FROM products) AND (SELECT MAX(price));"
    ],
    Advanced: [
      "WITH RECURSIVE subordinados AS (SELECT * FROM funcionarios WHERE id_gerente = 1);",
      "CREATE TABLE usuarios (id INT PRIMARY KEY, nome VARCHAR(255), criado_em TIMESTAMP);",
      "CREATE FUNCTION calcular_preco_total(id_pedido INT) RETURNS DECIMAL AS $$;",
      "CREATE TRIGGER atualizar_timestamp BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION;",
      "SELECT json_agg(json_build_object('id', id, 'nome', nome)) FROM pedidos;",
      "CREATE MATERIALIZED VIEW estatisticas_diarias AS SELECT date_trunc('dia', criado_em) as dia;",
      "SELECT * FROM (SELECT *, RANK() OVER (PARTITION BY dept ORDER BY salario DESC)) classificado;",
      "MERGE INTO tabela_destino d USING tabela_origem o ON (d.id = o.id);",
      "CREATE TYPE status_usuario AS ENUM ('ativo', 'inativo', 'suspenso');",
      "SELECT id_usuario, LAG(status) OVER (PARTITION BY id_usuario ORDER BY criado_em);"
    ]
  },
  TypeScript: {
    Beginner: [
      "let name: string = 'John';",
      "interface User { id: number; name: string; }",
      "function add(a: number, b: number): number { return a + b; }",
      "type Status = 'active' | 'inactive';",
      "const numbers: number[] = [1, 2, 3];",
      "enum Direction { Up, Down, Left, Right }",
      "class Car { constructor(public make: string, public model: string) {} }",
      "const greet = (name: string): void => { console.log(`Hello ${name}`); }",
      "interface Config { readonly apiKey: string; optional?: boolean; }",
      "const tuple: [string, number] = ['age', 25];"
    ],
    Intermediate: [
      "type ActionType = { type: string; payload: unknown; meta?: object; };",
      "function identity<T>(arg: T): T { return arg; }",
      "interface Repository<T> { findById(id: string): Promise<T>; }",
      "type Partial<T> = { [P in keyof T]?: T[P]; };",
      "class Queue<T> implements Collection<T> { private items: T[] = []; }",
      "const guard = (value: unknown): value is string => typeof value === 'string';",
      "type Handler<T> = (event: T) => void;",
      "interface Subscribable<T> { subscribe(handler: Handler<T>): void; }",
      "const assertIsString = (value: unknown): asserts value is string => {};",
      "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;"
    ],
    Advanced: [
      "type PartesProfundas<T> = { [P in keyof T]?: PartesProfundas<T[P]>; };",
      "interface Props<T> extends PropsComponente { dados: T; carregando: boolean; }",
      "type UniaoParaIntersecao<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;",
      "declare module '*.vue' { export default Vue; }",
      "type Aguardado<T> = T extends Promise<infer U> ? Aguardado<U> : T;",
      "const decorador = <T extends { new (...args: any[]): {} }>(construtor: T) => {};",
      "type ExcluirPropriedadesCorrespondentes<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? never : K }[keyof T]>;",
      "interface IteradorAsync<T> { proximo(): Promise<ResultadoIterador<T>>; }",
      "type SomenteLeituraProfunda<T> = { readonly [P in keyof T]: SomenteLeituraProfunda<T[P]>; };",
      "type PropriedadesFuncao<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];"
    ]
  }
}

const texts = {
  en: [
    "const handleSubmit = (event) => { event.preventDefault(); setData(newData); };",
    "useEffect(() => { fetchData(); return () => cleanup(); }, [dependencies]);",
    "const [state, dispatch] = useReducer(reducer, initialState);",
    "export const createSlice = ({ name, initialState, reducers }) => {};",
    "interface Props<T> extends ComponentProps { data: T; loading: boolean; }",
    "type ActionType = { type: string; payload: unknown; meta?: object; };",
    "def quicksort(arr): return [] if not arr else quicksort([x for x in arr[1:] if x < arr[0]]);",
    "with open('file.txt', 'r') as f: content = f.read().splitlines();",
    "public static <T extends Comparable<T>> void sort(List<T> list) {",
    "try (BufferedReader reader = new BufferedReader(new FileReader(file))) {",
    "SELECT users.name, COUNT(orders.id) FROM users LEFT JOIN orders ON users.id = orders.user_id;",
    "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), created_at TIMESTAMP);"
  ],
  pt: [
    "const enviarFormulario = (evento) => { evento.preventDefault(); setDados(novosDados); };",
    "useEffect(() => { buscarDados(); return () => limpeza(); }, [dependencias]);",
    "const [estado, despachar] = useReducer(redutor, estadoInicial);",
    "export const criarFatia = ({ nome, estadoInicial, redutores }) => {};",
    "interface Props<T> extends PropsComponente { dados: T; carregando: boolean; }",
    "type TipoAcao = { tipo: string; carga: unknown; meta?: object; };",
    "def ordenacaoRapida(arr): return [] if not arr else ordenacaoRapida([x for x in arr[1:] if x < arr[0]]);",
    "with open('arquivo.txt', 'r') as f: conteudo = f.read().splitlines();",
    "public static <T extends Comparable<T>> void ordenar(Lista<T> lista) {",
    "try (LeitorBuffer leitor = new LeitorBuffer(new LeitorArquivo(arquivo))) {",
    "SELECT usuarios.nome, COUNT(pedidos.id) FROM usuarios LEFT JOIN pedidos ON usuarios.id = pedidos.usuario_id;",
    "CREATE TABLE usuarios (id INT PRIMARY KEY, nome VARCHAR(255), criado_em TIMESTAMP);",
    "export const criarFatia = ({ nome, estadoInicial, redutores }) => {};",
    "const proxy = new Proxy(alvo, { get: (obj, prop) => Reflect.get(obj, prop) });",
    "type Armazenamento = { [K in keyof Estado]: (estado: Estado[K]) => void };",
    "const decorador = (alvo: any) => { return class extends alvo {}; };",
    "Symbol.iterador = function* () { yield* this.valores(); };",
    "new WeakMap().set(chave, { valor: 123, metadados: {} });",
    "Object.defineProperty(obj, 'prop', { get: () => this._prop });",
    "const { proxy, revogar } = Proxy.revocable(alvo, manipulador);",
    "Reflect.defineMetadata('chave', 'valor', alvo, 'propriedade');",
    "const dominio = new Realm({ transformacoes: [babel => ({ visitante: {} })] });",
    "def ordenacaoRapida(arr): return [] if not arr else ordenacaoRapida([x for x in arr[1:] if x < arr[0]]);",
    "from dataclasses import dataclass, campo",
    "async with clienteHttp.SessaoCliente() as sessao:",
    "class Meta(tipo): def __new__(cls, nome, bases, atributos):",
    "from typing import TipoVar, Generico",
    "import asyncio\nloop = asyncio.get_event_loop()",
    "from contextlib import gerenciador_contexto, gerenciador_contexto_async",
    "import multiprocessamento as mp",
    "from functools import metodo_despacho_unico",
    "import numpy as np\nfrom tensorflow import keras",
    "public static <T extends Comparavel<T>> void ordenar(Lista<T> lista) {",
    "@Aspecto @Componente public class AspectoLog { @Antes('execucao(* *.*(..))') }",
    "public class MinhaClasse<T extends Comparavel<? super T>> implements Comparavel<MinhaClasse<T>> {",
    "volatile boolean sinalizador = true;",
    "synchronized void metodo() { while(condicao) { esperar(); } notificarTodos(); }",
    "BufferBytes buffer = BufferBytes.alocar(1024);",
    "Class<?> classe = Class.forName('com.exemplo.MinhaClasse');",
    "public record Pessoa(String nome, int idade) {}",
    "sealed interface Forma permits Circulo, Retangulo, Quadrado {}",
    "var resultado = switch(valor) { case 1 -> 'um'; default -> 'outro'; };",
    "WITH RECURSIVE subordinados AS (SELECT * FROM funcionarios WHERE id_gerente = 1);",
    "CREATE TABLE usuarios (id INT PRIMARY KEY, nome VARCHAR(255), criado_em TIMESTAMP);",
    "CREATE FUNCTION calcular_preco_total(id_pedido INT) RETURNS DECIMAL AS $$;",
    "CREATE TRIGGER atualizar_timestamp BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION;",
    "SELECT json_agg(json_build_object('id', id, 'nome', nome)) FROM pedidos;",
    "CREATE MATERIALIZED VIEW estatisticas_diarias AS SELECT date_trunc('dia', criado_em) as dia;",
    "SELECT * FROM (SELECT *, RANK() OVER (PARTITION BY dept ORDER BY salario DESC)) classificado;",
    "MERGE INTO tabela_destino d USING tabela_origem o ON (d.id = o.id);",
    "CREATE TYPE status_usuario AS ENUM ('ativo', 'inativo', 'suspenso');",
    "SELECT id_usuario, LAG(status) OVER (PARTITION BY id_usuario ORDER BY criado_em);",
    "type PartesProfundas<T> = { [P in keyof T]?: PartesProfundas<T[P]>; };",
    "interface Props<T> extends PropsComponente { dados: T; carregando: boolean; }",
    "type UniaoParaIntersecao<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;",
    "declare module '*.vue' { export default Vue; }",
    "type Aguardado<T> = T extends Promise<infer U> ? Aguardado<U> : T;",
    "const decorador = <T extends { new (...args: any[]): {} }>(construtor: T) => {};",
    "type ExcluirPropriedadesCorrespondentes<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? never : K }[keyof T]>;",
    "interface IteradorAsync<T> { proximo(): Promise<ResultadoIterador<T>>; }",
    "type SomenteLeituraProfunda<T> = { readonly [P in keyof T]: SomenteLeituraProfunda<T[P]>; };",
    "type PropriedadesFuncao<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];"
  ]
}

const modes = {
  sprint: { id: 'sprint', duration: 60, name: 'Sprint', description: 'Complete as many snippets as possible in 60s' },
  endurance: { id: 'endurance', duration: 300, name: 'Endurance', description: '5 minutes of continuous typing' },
  practice: { id: 'practice', duration: 0, name: 'Practice', description: 'No time limit, focus on accuracy' }
}

const achievements = {
  speedDemon: {
    id: 'speedDemon',
    name: 'Speed Demon',
    description: 'Reach 100 WPM',
    requirement: (stats: { wpm: number }) => stats.wpm >= 100,
    icon: '⚡'
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a test with 100% accuracy',
    requirement: (stats: { accuracy: number }) => stats.accuracy === 100,
    icon: '✨'
  }
}

interface TypingTestProps {
  settings: Settings
  onBack: () => void
}

const MistakeHeatMap = ({ mistakes }: { mistakes: HeatMapData[] }) => {
  return (
    <div className="keyboard-layout">
      {/* Visual representation of most common typing mistakes */}
    </div>
  )
}

const TextDisplay = ({ text, inputValue, combo }: TextDisplayProps) => {
  return (
    <div className="font-mono text-lg">
      <div className="bg-[#1f2023] rounded p-6">
        {text.split('').map((char, i) => {
          const inputChar = inputValue[i]
          let className = 'text-[#646669]' // Default color
          
          if (inputChar !== undefined) {
            className = inputChar === char ? 'text-[#4CAF50]' : 'text-[#ff4444]'
          }
          
          return (
            <span key={i} className={className}>
              {char}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function TypingTest({ settings, onBack }: TypingTestProps) {
  const t = translations[settings.language]
  const currentTexts = texts[settings.language]
  const [currentText, setCurrentText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState({  
    wpm: 0,
    cpm: 0,
    accuracy: 100
  })
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [detailedStats, setDetailedStats] = useState<DetailedStats & { maxCombo: number; currentCombo: number }>({
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    incorrectKeystrokes: 0,
    mistakesByCharacter: {},
    timeElapsed: 0,
    rawWpm: 0,
    netWpm: 0,
    accuracy: 100,
    maxCombo: 0,
    currentCombo: 0
  })
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [rankings, setRankings] = useState<RankingType[]>([])
  const [mistakes, setMistakes] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [completedTexts, setCompletedTexts] = useState<string[]>([])
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const correctSound = useRef<HTMLAudioElement | null>(null)
  const wrongSound = useRef<HTMLAudioElement | null>(null)
  const comboSound = useRef<HTMLAudioElement | null>(null)

  // Load saved stats on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('typingStats')
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setRankings(stats.rankings || [])
    }

    // Initialize audio elements
    correctSound.current = new Audio('/sounds/correct.mp3')
    wrongSound.current = new Audio('/sounds/wrong.mp3')
    comboSound.current = new Audio('/sounds/combo.mp3')
  }, [])

  // Save stats when updated
  useEffect(() => {
    localStorage.setItem('typingStats', JSON.stringify({
      rankings,
      lastPlayed: new Date().toISOString()
    }))
  }, [rankings])

  useEffect(() => {
    loadNewText()
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (startTime && !isComplete) {
      timer = setInterval(() => {
        const currentTime = Date.now()
        const timeElapsed = (currentTime - startTime) / 1000
        const wordsTyped = inputValue.trim().split(/\s+/).length
        const charsTyped = inputValue.length
        
        // Count correct keystrokes for accuracy
        let correctKeystrokes = 0
        let totalKeystrokes = inputValue.length
        
        for (let i = 0; i < inputValue.length; i++) {
          if (i < currentText.length && inputValue[i] === currentText[i]) {
            correctKeystrokes++
          }
        }

        const wpm = Math.round((wordsTyped / timeElapsed) * 60)
        const cpm = Math.round((charsTyped / timeElapsed) * 60)
        const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100

        setStats({ wpm, cpm, accuracy })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [startTime, inputValue, currentText, isComplete])

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsComplete(true);
            setShowAnalysis(true);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const loadNewText = () => {
    const availableTexts = categorizedTexts[settings.programmingLanguage][settings.difficulty]
      .filter(text => !completedTexts.includes(text))
    
    if (availableTexts.length === 0) {
      setIsComplete(true)
      setShowAnalysis(true)
      return
    }

    const newText = availableTexts[Math.floor(Math.random() * availableTexts.length)]
    setCurrentText(newText)
    setInputValue('')
    setStartTime(null)
    setIsComplete(false)
  }

  const playSound = (type: 'correct' | 'wrong' | 'combo') => {
    if (!soundEnabled) return
    
    switch (type) {
      case 'correct':
        correctSound.current?.play()
        break
      case 'wrong':
        wrongSound.current?.play()
        break
      case 'combo':
        comboSound.current?.play()
        break
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const prevValue = inputValue
    setInputValue(value)

    // Initialize start time if not set
    if (!startTime) {
      setStartTime(Date.now())
      setIsActive(true)
    }

    // Track keystrokes and mistakes
    const newMistakes: number[] = []
    const newMistakesByCharacter: { [key: string]: number } = { ...detailedStats.mistakesByCharacter }
    
    // Calculate new keystrokes for this input change
    const newKeystrokes = Math.abs(value.length - prevValue.length)
    let newCorrectKeystrokes = 0
    let newIncorrectKeystrokes = 0

    // If backspace was pressed
    if (value.length < prevValue.length) {
      newIncorrectKeystrokes = newKeystrokes // Count backspaces as incorrect
    } else {
      // For new characters typed
      for (let i = prevValue.length; i < value.length; i++) {
        if (i < currentText.length && value[i] === currentText[i]) {
          newCorrectKeystrokes++
        } else {
          newIncorrectKeystrokes++
          newMistakes.push(i)
          if (i < currentText.length) {
            const char = currentText[i]
            newMistakesByCharacter[char] = (newMistakesByCharacter[char] || 0) + 1
          }
        }
      }
    }

    // Update total keystroke counts
    const totalKeystrokes = detailedStats.totalKeystrokes + newKeystrokes
    const correctKeystrokes = detailedStats.correctKeystrokes + newCorrectKeystrokes
    const incorrectKeystrokes = detailedStats.incorrectKeystrokes + newIncorrectKeystrokes
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100

    // Calculate stats
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0
    const rawWpm = Math.round((value.length / 5) / (timeElapsed / 60))
    const netWpm = Math.round(rawWpm * (accuracy / 100))

    // Update stats state
    setStats({
      wpm: netWpm,
      accuracy,
      cpm: Math.round(value.length / (timeElapsed / 60))
    })

    // Update detailed stats
    setDetailedStats(prev => ({
      ...prev,
      totalKeystrokes,
      correctKeystrokes,
      incorrectKeystrokes,
      mistakesByCharacter: newMistakesByCharacter,
      timeElapsed,
      rawWpm,
      netWpm,
      accuracy
    }))

    // Handle combo system
    if (value.length > prevValue.length) { // Only check combo on new characters
      if (value[value.length - 1] === currentText[value.length - 1]) {
        setCombo(prev => {
          const newCombo = prev + 1
          if (newCombo > maxCombo) {
            setMaxCombo(newCombo)
            if (newCombo % 10 === 0) { // Play combo sound every 10 combos
              playSound('combo')
            }
          }
          return newCombo
        })
        playSound('correct')
      } else {
        playSound('wrong')
        setCombo(0)
      }
    }

    // Check if text is complete and correct
    if (value === currentText) {
      setIsComplete(true)
      const timeBonus = 15
      setTimeLeft(prev => prev + timeBonus)
      
      // Add current text to completed texts
      setCompletedTexts(prev => {
        const newCompleted = [...prev, currentText]
        
        // Get total number of texts for this difficulty
        const totalTexts = categorizedTexts[settings.programmingLanguage][settings.difficulty].length
        
        // If we completed all texts
        if (newCompleted.length >= totalTexts) {
          // Use setTimeout to ensure state updates are processed
          setTimeout(() => {
            setShowAnalysis(true)
          }, 100)
        } else {
          // Load new text after a short delay
          setTimeout(() => {
            loadNewText()
          }, 1000)
        }
        
        return newCompleted
      })

      // Add to rankings if good enough
      if (netWpm > 0) {
        const newRanking: RankingType = {
          id: Date.now().toString(),
          username: 'Anonymous',
          wpm: netWpm,
          accuracy,
          timestamp: new Date()
        }
        setRankings(prev => [...prev, newRanking]
          .sort((a, b) => b.wpm - a.wpm)
          .slice(0, 10))
      }
    }
  }

  const handleRestart = () => {
    setIsComplete(false)
    setShowAnalysis(false)
    setInputValue('')
    setStartTime(null)
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 100
    })
    setMistakes([])
    setDetailedStats({
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      incorrectKeystrokes: 0,
      mistakesByCharacter: {},
      timeElapsed: 0,
      rawWpm: 0,
      netWpm: 0,
      accuracy: 100,
      maxCombo: 0,
      currentCombo: 0
    })
    setCombo(0)
    setMaxCombo(0)
    setCompletedTexts([])
    setTimeLeft(60)
    setIsActive(false)
    
    setTimeout(() => {
      loadNewText()
      inputRef.current?.focus()
    }, 0)
  }

  if (showAnalysis) {
    return (
      <div className="min-h-screen flex items-center bg-[#121316]">
        <div className="max-w-3xl mx-auto w-full py-8 px-4">
          <Analysis stats={detailedStats} onRestart={handleRestart} language={settings.language} />
          <div className="mt-8">
            <Achievements 
              stats={{
                wpm: detailedStats.netWpm,
                accuracy: detailedStats.accuracy,
                totalTime: detailedStats.timeElapsed,
                completedTests: completedTexts.length
              }} 
              achievements={achievements}
            />
          </div>
          {rankings.length > 0 && (
            <div className="mt-8">
              <Ranking rankings={rankings} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center bg-[#121316]">
      <div className="max-w-2xl mx-auto w-full py-8 px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-[#646669] hover:text-[#d1d0c5] transition-colors text-sm"
            >
              ← {settings.language === 'en' ? 'Back' : 'Voltar'}
            </button>
            <button
              onClick={() => setShowAnalysis(true)}
              className="text-[#646669] hover:text-[#d1d0c5] transition-colors text-sm"
            >
              {settings.language === 'en' ? 'Show Results' : 'Ver Resultados'}
            </button>
          </div>
          <div className="flex items-center gap-8 text-sm text-[#646669]">
            <div>
              <span className="text-[#d1d0c5] mr-1">{stats.wpm}</span>
              wpm
            </div>
            <div>
              <span className="text-[#d1d0c5] mr-1">{stats.accuracy}%</span>
              acc
            </div>
            <div>
              <span className="text-[#d1d0c5] mr-1">{timeLeft}</span>
              sec
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TextDisplay
            text={currentText}
            inputValue={inputValue}
            combo={combo}
          />

          <textarea
            value={inputValue}
            onChange={handleInput}
            className="w-full bg-[#1f2023] text-[#d1d0c5] rounded p-6 font-mono 
              resize-none focus:outline-none focus:ring-1 focus:ring-[#646669] text-lg"
            rows={4}
            placeholder={t.placeholder}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
} 