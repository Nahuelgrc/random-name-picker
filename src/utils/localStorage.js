class AppLocalStorage {
  key;

  constructor(key) {
    this.key = key;
  }

  save(value) {
    const currentLS = this.read();

    if (currentLS.length === 0) {
      localStorage.setItem(this.key, JSON.stringify([...value]));
      return;
    }

    localStorage.setItem(this.key, JSON.stringify([...currentLS, ...value]));
  }

  remove(value) {
    const currentLS = this.read();

    if (currentLS.length === 0) {
      return;
    }

    const index = currentLS.indexOf(value);

    if (index < 0) {
      return;
    }

    currentLS.splice(index, 1);

    localStorage.setItem(this.key, JSON.stringify(currentLS));
  }

  clean() {
    localStorage.removeItem(this.key);
  }

  read() {
    try {
      const currentLS = localStorage.getItem(this.key);
      if (!currentLS) {
        return [];
      }

      return JSON.parse(currentLS);
    } catch {
      return [];
    }
  }
}

export const AppLSInstance = new AppLocalStorage('name');
