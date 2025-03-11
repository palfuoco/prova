package io.unical.demacs.informatica.mangia_italia;

import java.util.List;

public interface DAO<T, K> {
    T get(K key);
    List<T> getAll();
    void save(T t);
    void update(T t);
    void delete(K key);
}
