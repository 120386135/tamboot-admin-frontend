public interface SystemRoleMapper extends CommonMapper<SystemRoleModel, Long> {
    int deleteByRoleCode(String roleCode);
}