package org.ntdashboard.Model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orv5_etl.exclusion_list")
public class ExclusionList {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "served_msisdn")
    private String servedMsisdn;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServedMsisdn() {
        return servedMsisdn;
    }

    public void setServedMsisdn(String servedMsisdn) {
        this.servedMsisdn = servedMsisdn;
    }
}
