@Service
@Transactional(readOnly = true)
public class SystemUserServiceImpl implements SystemUserService {
    @Autowired
    private SystemUserMapper systemUserMapper;

    @Autowired
    private PasswordEncoderFactory passwordEncoderFactory;

    @Override
    @Transactional(readOnly = false)
    public SystemUserModel create(CreateUserForm form) {
        SystemUserModel existingUser = systemUserMapper.selectOneByUsername(form.getUsername());
        if (existingUser != null) {
            throw new BusinessException("用户名已存在");
        }

        String encodedPassword = passwordEncoderFactory.get().encode(form.getPassword());
        SystemUserModel user = new SystemUserModel();
        user.setUsername(form.getUsername());
        user.setPassword(encodedPassword);
        user.setStatus(UserStatus.ENABLED.value());
        systemUserMapper.insert(user);
        return user;
    }
}
