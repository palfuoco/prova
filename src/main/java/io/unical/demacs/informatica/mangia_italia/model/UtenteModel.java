package io.unical.demacs.informatica.mangia_italia.model;

public class UtenteModel {

    private String email;
    private String nickname;
    private String password;
    private String regioneDiResidenza;

    public UtenteModel() {}

    public UtenteModel(String email, String nickname, String password, String regioneDiResidenza) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.regioneDiResidenza = regioneDiResidenza;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRegioneDiResidenza() {
        return regioneDiResidenza;
    }

    public void setRegioneDiResidenza(String regioneDiResidenza) {
        this.regioneDiResidenza = regioneDiResidenza;
    }
}
