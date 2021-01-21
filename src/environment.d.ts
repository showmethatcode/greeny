declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      TIMEZONE: string
      CHANNEL: string
    }
  }
}

export {}
