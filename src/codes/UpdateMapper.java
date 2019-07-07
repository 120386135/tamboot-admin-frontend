public interface SystemUserMapper extends CommonMapper<SystemUserModel, Long> {
    int updateByUsername(SystemUserModel model);
}