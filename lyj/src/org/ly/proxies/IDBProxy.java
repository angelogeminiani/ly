package org.ly.proxies;

/**
 *
 */
public interface IDBProxy<T> {

    T getDB(final String dbname) throws Exception;

    T getDBMain() throws Exception;

}
