function setStorage(item: string, value: string) {
    return localStorage.setItem(`jera_${item}`, JSON.stringify(value));
}

function getStorage(item: string) {
    const itemStorage = localStorage.getItem(`jera_${item}`);
    
    if (!itemStorage) {
        return null;
    }

    try {
        return JSON.parse(itemStorage);
    } catch {
        return null;
    }
}

function removeStorage(item: string) {
    localStorage.removeItem(`jera_${item}`);
}

export { setStorage, getStorage, removeStorage };