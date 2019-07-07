public interface SystemMenuMapper extends CommonMapper<SystemMenuModel, Long> {
    List<SystemMenuModel> selectAllByParent(Long parent);

    List<SystemMenuModel> selectAllByRoleCodes(@Param("roleCodes") Collection<String> roleCodes);
}
