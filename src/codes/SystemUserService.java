public interface SystemUserService {
    /**
     * Create a user
     * @param form {@code form.username} required<br/>
     *              {@code form.password} required
     * @return the created user
     * @throws com.tamboot.web.config.BusinessException if required form fields not set, 
     * or username exists, or {@code form.password} format wrong
     */
    SystemUserModel create(CreateUserForm form);
}
