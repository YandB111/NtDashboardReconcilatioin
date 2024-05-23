package org.ntdashboard.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class ExclusionListDao {

    @Autowired
    private DataSource dataSource;

    public boolean isServedMsisdnExists(String servedMsisdn) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("SELECT COUNT(*) FROM orv5_etl.exclusion_list WHERE served_msisdn = ?")) {
            statement.setString(1, servedMsisdn);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    return count > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void addServedMsisdn(String servedMsisdn) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("INSERT INTO orv5_etl.exclusion_list (served_msisdn) VALUES (?)")) {
            statement.setString(1, servedMsisdn);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteServedMsisdn(String servedMsisdn) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("DELETE FROM orv5_etl.exclusion_list WHERE served_msisdn = ?")) {
            statement.setString(1, servedMsisdn);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
