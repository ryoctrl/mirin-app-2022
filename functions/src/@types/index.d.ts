declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Token for SendGrid
     */
    readonly SENDGRID_API_KEY: string;

    /**
     * An url running the application (e.g. https://kumd.mosin.jp)
     */
    readonly SITE_URL: string;
  }
}
