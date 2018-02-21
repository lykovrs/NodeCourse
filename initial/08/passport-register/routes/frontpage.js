exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    // db.find(), recommendations.fetch()
    // locals = { recommendations: [{}, {}], users: [{}, {}] }
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }

};
